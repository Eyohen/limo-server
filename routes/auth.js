const {register, login, admin_login} = require('../controllers/auth')

const express=require('express')
const router = express.Router()


router.post("/register",register)
router.post("/login",login)
router.post("/adminlogin",admin_login)


module.exports = router