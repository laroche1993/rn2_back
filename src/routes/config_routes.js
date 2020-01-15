const express = require('express')
const router = express.Router()

const {getConfig,addConfig,updateConfig,deleteConfig} = require('../controllers/config_controller')
const {tokenVerify} = require('../controllers/security/verify_token')

router.get('/',tokenVerify,getConfig)
router.post('/',tokenVerify,addConfig)
router.put('/:id',tokenVerify,updateConfig)
router.delete('/:id',tokenVerify,deleteConfig)

module.exports = router