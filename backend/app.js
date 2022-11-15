const express = require('express');
const http = require('http');
const mongoose =require('mongoose');
const socket = require('socket.io');
const User=require('./models/user.js');
const {signup}=require('./controllers/authentication.js');

const app=express();
const server=http.createServer(app);
const io=require('socket.io')(server);
app.use(express.json());


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