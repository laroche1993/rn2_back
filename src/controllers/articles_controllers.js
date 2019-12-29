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
            res.status(500).send(error)          
        }
   },
    addArticles:async(req,res)=>{
        try {
            const {title,category,date,user} = req.body
            const article = new Articles({title,category,date,user})
            res.status(200).json({mesage :"Articulo adicionado correctamente"})
            article.save()
        } catch (error) {
            res.status(500).send(error)
        }
    },
    updateArticles:async (req,res)=>{
        try {
          await Articles.findByIdAndUpdate(req.params.id,req.body,(err)=>{
              if(err){console.log(err)}
              else{res.status(200).json({mesage:"Articulos Actualizado"})}
          })
        } catch (error) {
            res.status(500).send(error)
        }
       

    },
    deleteArticle:async (req,res)=>{
        try {
            await Articles.findByIdAndRemove(req.params.id,(err)=>{
                if(err){
                    console.log(err)
                }else{
                    res.status(200).json({mesage:"Se ha eliminado el articulo"})
                }
            })
        } catch (error) {
            res.status(500).send(error)
        }
    }
}
module.exports = articlesControllers