const {getUser, getUsers} = require('../controllers/user')
const verifyToken = require('../verifyToken')
const express=require('express')
const router = express.Router()


router.get("/:id", verifyToken ,getUser)
router.get("/", verifyToken ,  getUsers)



module.exports = router