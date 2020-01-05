const express = require('express')
const router = express.Router()
const {sendMail} =require('../controllers/comprar_autos')

router.post('/',sendMail)

module.exports = router