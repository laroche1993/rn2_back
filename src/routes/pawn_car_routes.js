const express = require('express')
const router = express.Router()
const {sendMailPawn} = require('../controllers/pawn_car')

router.post('/',sendMailPawn)

module.exports = router;