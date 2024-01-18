const mongoose = require('mongoose')
const ReserveSchema = require('./reserve')

const VehicleSchema = new mongoose.Schema({
    vehicleName:{
        type:String,
        required:false, 
    },
    reserves: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reserve'
      }],
    photo:{
        type:String,
        required:false,    
    },

  
    // user: User,
   
  

},{timestamps:true})

module.exports=mongoose.model("Vehicle", VehicleSchema)

