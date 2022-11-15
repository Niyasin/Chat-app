const mongoose = require('mongoose');
const {randomBytes,scryptSync,timingSafeEqual} =require('crypto');

const userSchema = new mongoose.Schema({
   username:{
       type:String,
       required:true,
       unique:true,
       lowercase:true,
   },
   password:{
       type:String,
       required:true,
   },
   displayname:{
       type:String
   },
   status:{
       
       type:Boolean,
   },
   profilePic:{
       type:String,
       default:'./img/unknown.jpg',
   },
   contacts:[{
       id:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"user",
       },
       data_id:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"data",
       }

   }],
});


userSchema.pre('save',function(next){
    console.log(this.password);
    let salt=randomBytes(16).toString('hex');
    let hashed=scryptSync(this.password,salt,32).toString('hex');
    this.password=hashed+':'+salt;
    next();
});

const User =mongoose.model('user',userSchema); 
module.exports=User;