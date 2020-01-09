const express = require('express')
const router = express.Router()

//Controllers
const {getUser,getUserbyId,addUser,deleteUser,updateUser,updatePassword} = require("../controllers/users_controllers")
const {tokenVerify} = require('../controllers/security/verify_token')

router.get("/",tokenVerify,getUser)
router.get("/:id",tokenVerify, getUserbyId)
router.post("/",tokenVerify,addUser)
router.delete("/:id",tokenVerify,deleteUser)
router.put("/:id",tokenVerify,updateUser)
router.put("/updatePassword/:id",updatePassword)

module.exports = router;