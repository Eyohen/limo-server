
// const {model: User} = require('../model/user')
// const bcrypt=require('bcrypt')
// const Apartment=require('../models/Apartment')
const Event = require('../model/event')
// const Comment=require('../models/Comment')
const verifyToken = require('../verifyToken')

//CREATE Reserve
const createEvent =  async (req,res) => {
    try{
        
        // const user = await User.findById(req.userId)
        const newEvent = new Event(req.body)
        
        const savedEvent = await newEvent.save()
        res.status(200).json(savedEvent)
    }
    catch(err){
        console.log(err.message)
        res.status(500).json({message:"Event not made"})
    }
     
}

//UPDATE
const updateEvent = async (req,res)=>{
    try{
       
        const updatedEvent =await Event.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedEvent)

    }
    catch(err){
        res.status(500).json(err)
    }
}


//DELETE
const deleteEvent = async (req,res)=>{
    try{
        await Event.findByIdAndDelete(req.params.id)
        // await Comment.deleteMany({postId:req.params.id})
        res.status(200).json({message: "Event has been deleted!"})

    }
    catch(err){
        res.status(500).json(err)
    }
}


//GET Event DETAIL
const getEvent = async (req,res)=>{
    try{
        const event =await Event.findById(req.params.id)
        res.status(200).json(event)
       
    }
    catch(err){
        res.status(500).json(err)
    }
}

//GET Events
const getEvents = async (req,res)=>{
    const query=req.query
    
    try{
        const searchFilter={
            title:{$regex:query.search, $options:"i"}
        }
        const event = await Event.find(query.search?searchFilter:null)
        res.status(200).json(event)
    }
    catch(err){
        res.status(500).json(err)
    }
}

//GET USER POSTS
// const userrequest = async (req,res) =>{
// // router.get("/user/:userId",async (req,res)=>{
//     try{
//         const Event =await Reserve.find({userId:req.params.userId})
//         res.status(200).json(reserve)
//     }
//     catch(err){
//         res.status(500).json(err)
//     }
// }



module.exports = {createEvent, deleteEvent, getEvent, getEvents, updateEvent}