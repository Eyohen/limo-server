const express=require('express')
// const router=express.Router()
const {model: User}=require('../model/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


//REGISTER
const register = async (req,res) => {
    try{
        const {firstName,lastName,email,password} = req.body
        const salt=await bcrypt.genSalt(10)
        const hashedPassword= await bcrypt.hashSync(password,salt)
        const newUser=new User({firstName,lastName,email,password:hashedPassword})
        const savedUser=await newUser.save()
        res.status(200).json(savedUser)

    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }

}

// ADMIN LOGIN
const admin_login = async (req,res) => {

    try{
        const user=await User.findOne({email:req.body.email})
       
        if(!user){
            return res.status(404).json("User not found!")
        }
        if(user.role !== "admin"){
            return res.status(401).json({message: "Not Admin"})
        }
        const match=await bcrypt.compare(req.body.password,user.password)
        
        if(!match){
            return res.status(401).json("Wrong credentials!")
        }
        
        const token = jwt.sign({_id:user._id,email:user.email, role:user.role},process.env.SECRET,{expiresIn:"14d"})
        const {password,...info} = user._doc
        res.status(200).json({...info,access_token: token})

    }
    catch(err){
        res.status(500).json(err)
    }
}



//LOGIN
const login = async (req,res) => {

    try{
        const user=await User.findOne({email:req.body.email})
       
        if(!user){
            return res.status(404).json("User not found!")
        }
        const match=await bcrypt.compare(req.body.password,user.password)
        
        if(!match){
            return res.status(401).json("Wrong credentials!")
        }
        
        const token = jwt.sign({_id:user._id,email:user.email, role:user.role},process.env.SECRET,{expiresIn:"14d"})
        const {password,...info} = user._doc
        res.status(200).json({...info,access_token: token})

    }
    catch(err){
        res.status(500).json(err)
    }
}



//LOGOUT
// router.get("/logout",async (req,res)=>{
//     try{
//         res.clearCookie("token",{sameSite:"none",secure:true}).status(200).send("User logged out successfully!")

//     }
//     catch(err){
//         res.status(500).json(err)
//     }
// })

//REFETCH USER
// router.get("/refetch", (req,res)=>{
//     const token = req.cookies.token
//     jwt.verify(token,process.env.SECRET,{},async (err,data)=>{
//         if(err){
//             return res.status(404).json(err)
//         }
//         res.status(200).json(data)
//     })
// })


 module.exports = {register, admin_login, login}