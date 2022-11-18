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

module.exports.login=async (req,res)=>{
    let {username,password}=req.body;
    const user=await User.findOne({username});
    if(user){
        let [pw,salt]=user.password.split(':');
        let hashed=scryptSync(password,salt,32);
        let buffer = Buffer.from(pw,'hex');
        let auth = timingSafeEqual(buffer,hashed);
        if(auth){
            const token = createToken(user._id);
            res.setHeader('Set-Cookie',`token=${token}`);
            res.json({token,error:undefined});
        }else{
            throw Error('Invalied Password');
        }
    }else{
        throw Error('Invalied username');
    }
}

module.exports.auth =async(req,res,next)=>{
    const token = req.cookies.token;
    if(token){
        await jwt.verify(token,secret,(err,decoded)=>{
            if(err){
                res.send('unauthorised request');
            }else{
                req.user=decoded.id;
                next();
            }
        });
    }else{
        res.send('unauthorised request')
    }
}

module.exports.authSocket =async(socket,next)=>{
    const token =socket.handshake.auth.token;
    if(token){
        await jwt.verify(token,secret,(err,decoded)=>{
            if(err){
                
            }else{
                socket.user=decoded.id;
                next();
            }
        });
    }else{
    }
}