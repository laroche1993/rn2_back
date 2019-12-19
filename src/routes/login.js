const express = require('express')
const router = express.Router()

const {loginUser} = require("../controllers/security/login")

router.post('/',loginUser)

module.exports = router