const Articles = require('../models/articles_model')

const articlesControllers={
    getArticles:async(req,res)=>{
         try {
           const art  =   await Articles.find().populate('user')
           console.log(art)
           res.json(art)
         } catch (error) {
             console.log(error)             
         }
    },
    addArticles:async(req,res)=>{
        try {
            const {title,category,date,user} = req.body
            const article = new Articles({title,category,date,user})
            res.send("llego el articulo")
            article.save()
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = articlesControllers