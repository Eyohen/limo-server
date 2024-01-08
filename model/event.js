const mongoose = require('mongoose')
// const {schema: User}=require('./user')
const EventSchema = new mongoose.Schema({
    exhibitionName:{
        type:String,
        required:true,  
    },
    description:{
        type:String,
        required:false,  
    },
    city:{
        type:String,
        required:false,  
    },
    
    centre:{
        type:String,
        required:false,
      
    },
    photo:{
        type:String,
        required:false,    
    },
    date:{
        type:Date,
        required:false,
    },
    time:{
        type:String,
        required:false,  
    },
  
    // user: User,
   
  

},{timestamps:true})

module.exports=mongoose.model("Event", EventSchema)

