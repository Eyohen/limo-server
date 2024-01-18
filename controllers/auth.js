const express=require('express')
// const router=express.Router()
const {model: User}=require('../model/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const Token = require("../model/token")
const crypto = require("crypto")
const sendEmail = require('../utils/sendEmail')
const dotenv=require('dotenv')


//REGISTER
// const register = async (req,res) => {
//     try{
//         const {firstName,email,password} = req.body
//         let user = await User.findOne({email:req.body.email});
//         if(user)
//         return res.status(409).json({message:"User with given email already exist"})
//         const salt=await bcrypt.genSalt(10)
//         const hashedPassword= await bcrypt.hashSync(password,salt)
//         // const newUser = new User({firstName,email:req.body.email,password:hashedPassword})
//         user = new User({firstName,email:req.body.email,password:hashedPassword}).save()
//         res.send(user)
//        // const savedUser=await newUser.save()

//         // res.send(newUser)

// // generate token
//         const token = new Token({
//             userId: user._id,
//             token: crypto.randomBytes(16).toString("hex"),
//         });
//         await token.save()
//         console.log(token)
//         // send email
//         const link = `${BASE_URL}/api/users/confirm/${token.token}`;
//         await sendEmail(user.email, "Verify Email", link);
//         res.status(200).send({
//             message:"Email sent, check your mail"
//         })
 

//         // res.status(200).json(savedUser)

        
//     }
//     catch(err){
//         console.log(err)
//         res.status(500).json(err)
//     }

// }


const register = async (req, res) => {
    try {
      const { firstName, email, password } = req.body;
  
      // Check if the user already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(409).json({ message: "User with given email already exists" });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hashSync(password, salt);
  
      // Create a new user
      user = new User({ firstName, email: req.body.email, password: hashedPassword });
  
      // Save the user
      await user.save();
  
      // Generate a verification token
      const token = new Token({
        userId: user._id,
        token: crypto.randomBytes(16).toString("hex"),
      });
  
      // Save the token
      await token.save();
  
      // Send verification email
      const link = `${process.env.BASE_URL}/api/users/confirm/${token.token}`;
      await sendEmail(user.email, "Verify Email", link);
  
      // Respond to the client
      res.status(200).send({
        message: "Registration successful. Check your email for verification.",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  
// activate account

const activate = async (req, res) => {
    try {
      const token = await Token.findOne({ token: req.params.token });
  
      if (!token) {
        return res.status(400).send({ message: "Invalid or expired token" });
      }
  
      const user = await User.findById(token.userId);
  
      if (!user) {
        return res.status(400).send({ message: "User not found" });
      }
  
      // Update user to set verified flag to true
      await User.updateOne({ _id: token.userId }, { $set: { verified: true } });
  
      // Remove the token from the database
      await Token.findByIdAndRemove(token._id);
  
      return res.send("Email verified");
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "You are ready to log in" });
    }
  };



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
        const user = await User.findOne({email:req.body.email})
       
        if(!user){
            return res.status(401).json({message:"Invalid Email or password"})
        }

        if(!user.verified){
            return res.status(401).json({message:"Invalid Email or password"})
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


//Logout
const logout = async (req, res) => {
    const { token } = req.body;
  
    // Invalidate the user's token by removing it from the database
    await User.findOneAndUpdate({ token }, { $set: { token: null } });
  
    res.json({ success: true });
  };


 module.exports = {register, admin_login, login, logout, activate}