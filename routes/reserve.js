const {createReserve, updateReserve, deleteReserve, getReserve, getReserves} = require('../controllers/reserve')
const verifyToken = require('../verifyToken')
const express=require('express')
const router = express.Router()


router.post("/create", verifyToken, createReserve)
router.put("/:id", verifyToken, updateReserve)
router.get("/:id", verifyToken, getReserve)
router.get("/",getReserves)
router.delete("/:id", verifyToken, deleteReserve)


module.exports = router