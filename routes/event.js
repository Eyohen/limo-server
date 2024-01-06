const {createEvent, updateEvent, deleteEvent, getEvent, getEvents} = require('../controllers/event')
const verifyToken = require('../verifyToken')
const express = require('express')
const router = express.Router()


router.post("/create", verifyToken, createEvent)
router.put("/:id", verifyToken, updateEvent)
router.get("/:id", getEvent)
router.get("/",getEvents)
router.delete("/:id", verifyToken, deleteEvent)


module.exports = router