const jwt = require('jsonwebtoken');
const User=require('../models/user');
const {scryptSync,timingSafeEqual} =require('crypto');
const secret='aPpSEcrEtHEre!';


const createToken=(id)=>{
    return jwt.sign({id},secret,{
        expiresIn:100*60,
    });
}

module.exports.signup=async (req,res)=>{
    console.log('si');
    let {username,password}=req.body;
    try{
        const user =await User.create({username,password,displayname:username});
        const token = createToken(user._id);
        res.setHeader('Set-Cookie',`token=${token}`);
        res.json({token,error:undefined});
    }catch(err){
        console.log(err.message);
        if(err.code==11000){
            res.json({token:undefined,error:'User Already Exist'});
        }else{
            res.json({token:undefined,error:'Password is too short'});

        }
    }
}

