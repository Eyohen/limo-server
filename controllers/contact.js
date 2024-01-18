const express=require('express')

const Contact =require('../model/contact')
const bcrypt=require('bcrypt')
const verifyToken = require('../verifyToken')



 // CREATE Contact
const createContact = async (req,res)=>{
    try{
        const newContact = new Contact(req.body)
        // console.log(req.body)
        const savedContact = await newContact.save()
        
        res.status(200).json(savedContact)
    }
    catch(err){
        console.log(err.message)
        res.status(500).json({message:"Contact not created"})
    }
     
}


//UPDATE
const updateContact = async (req,res)=>{
    try{
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hashSync(req.body.password,salt)
        }
        console.log(req.body)
        const updatedUser=await Contact.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedUser)

    }
    catch(err){
        res.status(500).json(err)
    }
}


//DELETE
const deleteContact = async (req,res)=>{
    try{
        await Contact.findByIdAndDelete(req.params.id)
        // await Apartment.deleteMany({userId:req.params.id})
        // await Comment.deleteMany({userId:req.params.id})
        res.status(200).json("Contact has been deleted!")

    }
    catch(err){
        res.status(500).json(err)
    }
}

//GET USERS
const getContacts = async (req,res)=>{
    const query=req.query
    
    try{
        const searchFilter={
            title:{$regex:query.search, $options:"i"}
        }
        const users = await Contact.find(query.search?searchFilter:null)
        res.status(200).json(users)
    }
    catch(err){
        res.status(500).json(err)
    }
}


//GET USER
const getContact = async (req,res)=>{
    try{
        const user=await Contact.findById(req.params.id)
        const {password,...info}=user._doc
        res.status(200).json(info)
    }
    catch(err){
        res.status(500).json(err)
    }
}


module.exports= {createContact, getContact, getContacts, deleteContact, updateContact}