const expess  = require('events')
const router = expess.Router()

const {getCars} = require('../controllers/cars_controllers')

router.get('/',getCars)