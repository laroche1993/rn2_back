const express = require('express')
const router = express.Router()
const {sendMailPawn} = require('../controllers/pawn_car')
const multer = require('../controllers/images/multer_images')

router.post('/',multer.single('file'),sendMailPawn)

module.exports = router;