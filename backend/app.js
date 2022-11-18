const express = require('express');
const http = require('http');
const mongoose =require('mongoose');
const socket = require('socket.io');
const User=require('./models/user.js');
const Message =require('./models/messages.js')
var cookieParser = require('cookie-parser')
const {signup,login,auth,authSocket}=require('./controllers/authentication.js');

const app=express();
const server=http.createServer(app);
const io=require('socket.io')(server);
app.use(express.json());
app.use(cookieParser())

mongoose.connect('mongodb://127.0.0.1:27017/chat')
.then(()=>{
    server.listen(8080);
    console.log("Server Started");
})
.catch((er)=>{console.log('Database Error');console.error(er);});


//Socket
var connections={};
io.use(authSocket);
io.on('connection',(socket)=>{
    
    socket.on('setOnline',()=>{
        connections[socket.user]=socket.id;
    });

});


//Routes
app.get('/',(req,res)=>{
    res.send('Active');
});


app.post('/signup',signup);
app.post('/login',login);
app.post('/authToken',auth, async (req,res)=>{
    let data=await User.findOne({_id:req.user});
    res.json({
        validity:true,
        username:data.username,
    })
});
app.post('/getUserdata',auth,async (req,res)=>{
    let data=await User.findOne({username:req.body.username});
    if(data){
        res.json({
            username:data.username,
            displayname:data.displayname,
            profilePic:data.profilePic,
        })
    }
});

app.post('/getContacts',auth,async (req,res)=>{
    let data=await User.findOne({_id:req.user}).select('contacts.id').populate('contacts.id',['username','displayname','profilePic']);
    let contacts = data.contacts.map((e)=>{return({username:e.id.username,displayname:e.id.displayname,profilePic:e.id.profilePic})});
    
    if(data){
        res.json(contacts);
    }else{
        res.json([]);
    }
});

app.post('/search',auth,async (req,res)=>{
    let data=await User.search(req.query.q);
    res.json(data);
});

app.post('/addContact',auth,async(req,res)=>{
    let contact_username=req.body.contact;
    try{
        let  user= await User.findOne({_id:req.user});
        let contact= await User.findOne({username:contact_username});
        let exist=false;
        for(let i=0;i<user.contacts.length;i++){
            if(contact._id.equals(user.contacts[i].id)){
                exist=true;
                break;
            }
        }
        if(!exist){
            let data=await Message.create({users:[user._id,contact._id],data:[]});
            await User.updateOne(user,{$push:{contacts:{id:contact._id,data_id:data._id}}});
            await User.updateOne(contact,{$push:{contacts:{id:user._id,data_id:data._id}}});
            res.send('contact added');
        }else{
            res.send('contact alredy exist');
        }
    }catch(err){
        res.send('error');
    }
});


app.post('/getMessages',auth,async(req,res)=>{
    try{
        let contact=await User.findOne({username:req.body.contact});
        let user=await User.findOne({_id:req.user});
        for(let i=0;i<user.contacts.length;i++){
            if(user.contacts[i].id.equals(contact._id)){
                let messages =await Message.findById(user.contacts[i].data_id).exec((err,data)=>{
                    res.json(data.data||[]);
                });
            }
        }
    }catch(err){
        res.status(200);
    }
});
