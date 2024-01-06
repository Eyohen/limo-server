const mongoose = require('mongoose')
const {schema: User}=require('./user')
const RequestSchema=new mongoose.Schema({
    pickUp:{
        type:String,
        required:true,  
    },
    arrival:{
        type:String,
        required:true,  
    },
    
    time:{
        type:String,
        required:true,
      
    },
    date:{
        type:Date,
        required:false,
    },
    vehicle:{
        type:String,
        required:true,  
    },
    passengers:{
        type:Number,
        required:true,  
    },
    
    airport:{
        type:String,
        required:false,
      
    },
    flightNum:{
        type:String,
        required:false,
    },
    user: User,
   
  

},{timestamps:true})

module.exports=mongoose.model("Request",RequestSchema)

