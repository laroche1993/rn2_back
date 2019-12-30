const express = require('express')
const router = express.Router()

const  {getArticles,addArticles,getArticlesById,deleteArticle,updateArticles}= require('../controllers/articles_controllers')
const {tokenVerify} = require('../controllers/security/verify_token')

router.get('/',getArticles)
router.post('/',tokenVerify,addArticles)
router.get('/:id',getArticlesById)
router.put('/:id',tokenVerify,updateArticles)
router.delete('/:id',tokenVerify,deleteArticle)

module.exports = router