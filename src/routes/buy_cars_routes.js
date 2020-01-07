const express = require('express')
const router = express.Router()
const {sendMail} =require('../controllers/buy_cars')

router.post('/',sendMail)

module.exports = router