const expess  = require('express')
const router = expess.Router()

const {getCars} = require('../controllers/cars_controllers')

router.get('/',getCars)

module.exports = router