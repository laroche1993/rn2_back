const express = require('express')
const router = express.Router()

const  {getArticles,addArticles,getArticlesById,deleteArticle,updateArticles}= require('../controllers/articles_controllers')

router.get('/',getArticles)
router.post('/',addArticles)
router.get('/:id',getArticlesById)
router.put('/:id',updateArticles)
router.delete('/:id',deleteArticle)

module.exports = router