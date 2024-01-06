const mongoose = require('mongoose')

const UserSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,  
    },
    lastName:{
        type:String,
        required:true,  
    },
    
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
      }
  

},{timestamps:true})

module.exports={
    model: mongoose.model("User",UserSchema) ,
    schema: UserSchema
}
