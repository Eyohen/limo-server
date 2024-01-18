const {register, login, admin_login, logout} = require('../controllers/auth')

const express=require('express')
const router = express.Router()


router.post("/register",register)
router.post("/login",login)
router.post("/adminlogin",admin_login)
router.post("/logout", logout)


module.exports = router