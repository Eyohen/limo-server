const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,  
    },
    phone:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:true,  
    }, 
    description:{
        type:String,
        required:false,
    },


},{timestamps:true})

module.exports=mongoose.model("Contact", ContactSchema)