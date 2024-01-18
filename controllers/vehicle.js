
// const {model: User} = require('../model/user')
// const bcrypt=require('bcrypt')
// const Apartment=require('../models/Apartment')
const Vehicle = require('../model/vehicle')
const Reserve = require('../model/reserve')
const verifyToken = require('../verifyToken')

//CREATE Reserve
const createVehicle=  async (req,res) => {
    try{
        
        // const user = await User.findById(req.userId)
        const newVehicle= new Vehicle(req.body)
        
        const savedVehicle= await newVehicle.save()
        res.status(200).json(savedVehicle)
    }
    catch(err){
        console.log(err.message)
        res.status(500).json({message:"Vehicle not created"})
    }
     
}

//UPDATE
const updateVehicle= async (req,res)=>{
    try{
       
        const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedVehicle)

    }
    catch(err){
        res.status(500).json(err)
    }
}


//DELETE
const deleteVehicle= async (req,res)=>{
    try{
        await Vehicle.findByIdAndDelete(req.params.id)
        // await Comment.deleteMany({postId:req.params.id})
        res.status(200).json({message: "Vehicle has been deleted!"})

    }
    catch(err){
        res.status(500).json(err)
    }
}


//GET VehicleDETAIL
const getVehicle= async (req,res)=>{
    try{
        const vehicle=await Vehicle.findById(req.params.id).populate('reserves')
        res.status(200).json(vehicle)
       
    }
    catch(err){
        res.status(500).json(err)
    }
}

//GET Vehicles
const getVehicles = async (req,res)=>{
    const query=req.query
    
    try{
        const searchFilter={
            title:{$regex:query.search, $options:"i"}
        }
        const vehicle= await Vehicle.find(query.search?searchFilter:null).populate('reserves')
        res.status(200).json(vehicle)
    }
    catch(err){
        res.status(500).json(err)
    }
}





module.exports = {createVehicle, deleteVehicle, getVehicle, getVehicles, updateVehicle}