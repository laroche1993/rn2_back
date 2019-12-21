const express = require('express')
const router = express.Router()

const  {getArticles,addArticles}= require('../controllers/articles_controllers')

router.get('/',getArticles)
router.post('/',addArticles)

module.exports = router