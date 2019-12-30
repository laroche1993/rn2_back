const express = require('express')
const router = express.Router()

//Controllers
const {getUser,getUserbyId,addUser,deleteUser,updateUser} = require("../controllers/users_controllers")
const {tokenVerify} = require('../controllers/security/verify_token')

router.get("/",tokenVerify,getUser)
router.get("/:id",tokenVerify, getUserbyId)
router.post("/",tokenVerify,addUser)
router.delete("/:id",tokenVerify,deleteUser)
router.put("/:id",tokenVerify,updateUser)

module.exports = router;