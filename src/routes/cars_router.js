const expess  = require('express')
const router = expess.Router()

const {getCars,getCarsById,getFiltersParams} = require('../controllers/cars_controllers')

router.get('/getFilters',getFiltersParams)
router.get('/:id',getCarsById)
router.get('/',getCars)



module.exports = router