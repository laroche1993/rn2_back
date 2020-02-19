const express = require('express')
const router = express.Router()
const {sendMailSell} = require('../controllers/sell_car')
const multer = require('../controllers/images/multer_images')


router.post('/',multer.single('file'),sendMailSell)

module.exports = router;