const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
const multer=require('multer')
const path=require("path")
// const cookieParser=require('cookie-parser')
const auth = require('./routes/auth')
const reserve = require('./routes/reserve')
const event = require('./routes/event')
const user = require('./routes/user')
const vehicle = require('./routes/vehicle')
const contact = require('./routes/contact')
const { request } = require('http')
// const commentRoute=require('./routes/comments')

//database
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database is connected successfully!")

    }
    catch(err){
        console.log(err)
    }
}


//middlewares
dotenv.config()
app.use(express.json())
app.use("/images",express.static(path.join(__dirname,"/images")))

app.use(cors() )
// app.use(cookieParser())
app.use("/api/auth",auth)
app.use("/api/reserves",reserve)
app.use("/api/events", event)
app.use("/api/users", user)
app.use("/api/vehicles", vehicle)
app.use("/api/contacts", contact)



//image upload
const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        console.log(file)
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
        // fn(null,"image1.jpg")
    }
})

const upload=multer({storage:storage})
app.post("/api/upload",upload.array("file"),(req,res)=>{
console.log(req)
    res.status(200).json("Image has been uploaded successfully!")
})


app.listen(process.env.PORT,()=>{
    connectDB()
    console.log("app is running on port "+process.env.PORT)
})