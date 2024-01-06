
const {model: User} = require('../model/user')
// const bcrypt=require('bcrypt')
// const Apartment=require('../models/Apartment')
const Reserve = require('../model/reserve')
// const Comment=require('../models/Comment')
const verifyToken = require('../verifyToken')

//CREATE Reserve
const createReserve =  async (req,res) => {
    try{
        
        const user = await User.findById(req.userId)
        const newReserve = new Reserve({...req.body, user: user})
        
        const savedReserve = await newReserve.save()
        res.status(200).json(savedReserve)
    }
    catch(err){
        console.log(err.message)
        res.status(500).json({message:"Reserve not made"})
    }
     
}

//UPDATE
const updateReserve = async (req,res)=>{
    try{
       
        const updatedReserve =await Reserve.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedReserve)

    }
    catch(err){
        res.status(500).json(err)
    }
}


//DELETE
const deleteReserve = async (req,res)=>{
    try{
        await Reserve.findByIdAndDelete(req.params.id)
        // await Comment.deleteMany({postId:req.params.id})
        res.status(200).json({message: "Reserve has been deleted!"})

    }
    catch(err){
        res.status(500).json(err)
    }
}


//GET Reserve DETAIL
const getReserve = async (req,res)=>{
    try{
        const reserve =await Reserve.findById(req.params.id).populate('user')
        res.status(200).json(reserve)
       
    }
    catch(err){
        res.status(500).json(err)
    }
}

//GET Reserves
const getReserves = async (req,res)=>{
    const query=req.query
    
    try{
        const searchFilter={
            title:{$regex:query.search, $options:"i"}
        }
        const reserve = await Reserve.find(query.search?searchFilter:null)
        res.status(200).json(reserve)
    }
    catch(err){
        res.status(500).json(err)
    }
}

//GET USER POSTS
// const userrequest = async (req,res) =>{
// // router.get("/user/:userId",async (req,res)=>{
//     try{
//         const reserve =await Reserve.find({userId:req.params.userId})
//         res.status(200).json(reserve)
//     }
//     catch(err){
//         res.status(500).json(err)
//     }
// }



module.exports = {createReserve, deleteReserve, getReserve, getReserves, updateReserve}