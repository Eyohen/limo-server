const {getUser, getUsers} = require('../controllers/user')
const {activate} = require('../controllers/auth')
const verifyToken = require('../verifyToken')
const express=require('express')
const router = express.Router()


router.get("/:id", verifyToken ,getUser)
router.get("/confirm/:token",activate)

router.get("/", verifyToken ,  getUsers)



module.exports = router