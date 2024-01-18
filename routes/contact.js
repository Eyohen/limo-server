const {createContact, updateContact, deleteContact, getContact, getContacts} = require('../controllers/contact')
const verifyToken = require('../verifyToken')
const express=require('express')
const router = express.Router()


router.post("/create", createContact)
router.put("/:id", updateContact)
router.get("/:id", getContact)
router.get("/",getContacts)
router.delete("/:id", deleteContact)


module.exports = router