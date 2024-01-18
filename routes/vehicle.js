const {createVehicle, updateVehicle, deleteVehicle, getVehicle, getVehicles} = require('../controllers/vehicle')
const verifyToken = require('../verifyToken')
const express = require('express')
const router = express.Router()


router.post("/create", verifyToken, createVehicle)
router.put("/:id", verifyToken, updateVehicle)
router.get("/:id", getVehicle)
router.get("/",getVehicles)
router.delete("/:id", verifyToken, deleteVehicle)


module.exports = router