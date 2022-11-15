const express = require('express');
const http = require('http');
const mongoose =require('mongoose');
const socket = require('socket.io');


const app=express();
const server=http.createServer(app);
const io=require('socket.io')(server);

mongoose.connect('mongodb://127.0.0.1:27017/chat')
.then(()=>{
    server.listen(8080);
    console.log("Server Started");
})
.catch((er)=>{console.log('Database Error');console.error(er);});

app.post('/',(req,res)=>{
    res.send('Active');
});