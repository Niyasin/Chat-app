const express = require('express');
const http = require('http');
const mongoose =require('mongoose');
const socket = require('socket.io');
const User=require('./models/user.js');
var cookieParser = require('cookie-parser')
const {signup,login,auth}=require('./controllers/authentication.js');

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
    let data=await User.findOne({username:req.user});
    if(data){
        res.json(data.contacts);
    }else{
        res.json([]);
    }
});

app.post('/search',auth,async (req,res)=>{
    let data=await User.search(req.query.q);
    res.json(data);
});