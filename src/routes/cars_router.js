const expess  = require('express')
const router = expess.Router()

const {getCars,getCarsById} = require('../controllers/cars_controllers')

router.get('/',getCars)
router.get('/:id',getCarsById)

module.exports = router