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
    getArticlesById:async(req,res)=>{
        try {
          const art  =   await Articles.findById(req.params.id).populate('user')
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
    },
    updateArticles:async (req,res)=>{
        try {
          await Articles.findByIdAndUpdate(req.params.id,req.body,(err)=>{
              if(err){console.log(err)}
              else{res.json("Articulos Actualizado")}
          })
        } catch (error) {
            console.log(error)
        }
       

    },
    deleteArticle:async (req,res)=>{
        try {
            await Articles.findByIdAndRemove(req.params.id,(err)=>{
                if(err){
                    console.log(err)
                }else{
                    res.json("Se ha eliminado el articulo")
                }
            })
        } catch (error) {
            
        }
    }
}
module.exports = articlesControllers