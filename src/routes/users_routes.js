const express = require('express')
const router = express.Router()

//Controllers
const {getUser,getUserbyId,addUser,deleteUser,updateUser} = require("../controllers/users_controllers")
const {tokenVerify} = require('../controllers/security/verify_token')

router.get("/",tokenVerify,getUser)
router.get("/:id", getUserbyId)
router.post("/",addUser)
router.delete("/:id",deleteUser)
router.put("/:id",updateUser)

module.exports = router;