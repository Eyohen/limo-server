const mongoose = require('mongoose')
const {schema: User}=require('./user')
const ReserveSchema=new mongoose.Schema({
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
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
      },
    passengers:{
        type:Number,
        required:true,  
    },
    phone:{
        type:Number,
        required:false,  
    },
    airport:{
        type:String,
        required:false,
      
    },
    flightNum:{
        type:String,
        required:false,
    },
    desc:{
        type:String,
        required:false,
    },
    userId: {
        type:String,
        required:false,
    }
   
  

},{timestamps:true})

module.exports=mongoose.model("Reserve",ReserveSchema)

