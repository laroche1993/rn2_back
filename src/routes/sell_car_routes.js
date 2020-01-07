const express = require('express')
const router = express.Router()
const {sendMailSell} = require('../controllers/sell_car')

router.post('/',sendMailSell)

module.exports = router;