const expess  = require('express')
const router = expess.Router()

const {getCars,getCarsById,getFiltersParams,carsFilter} = require('../controllers/cars_controllers')

router.get('/getFiltersParams',getFiltersParams)
router.get('/carsFilter',carsFilter)
router.get('/:id',getCarsById)
router.get('/',getCars)




module.exports = router