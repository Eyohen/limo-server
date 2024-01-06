const mongoose = require('mongoose')
// const {schema: User}=require('./user')
const EventSchema = new mongoose.Schema({
    exhibitionName:{
        type:String,
        required:true,  
    },
    city:{
        type:String,
        required:true,  
    },
    
    centre:{
        type:String,
        required:true,
      
    },
    date:{
        type:Date,
        required:false,
    },
    time:{
        type:String,
        required:true,  
    },
  
    // user: User,
   
  

},{timestamps:true})

module.exports=mongoose.model("Event", EventSchema)

