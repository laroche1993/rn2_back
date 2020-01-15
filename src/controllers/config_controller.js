const Configuration = require('../models/config_models')

const config = {
    getConfig: async (req,res)=>{
        try {
            const conf = await Configuration.find()
            conf ? res.json(conf):res.status(400).send()
    
        } catch (error) {
            res.send(error)
        }
    },
    addConfig: async (req,res)=>{
        try {
            const {logo,contact} = req.body
            const co = new Configuration({logo,contact})
           await co.save()
            res.send({message:"Configuraciòn guardada correctamente"})
        } catch (error) {
            res.send({message:error})
        }
    },
    updateConfig: async (req,res)=>{
        try {
            await Configuration.findByIdAndUpdate(req.params.id,req.body,(err)=>{
                if(err){console.log(err)}
              else{res.status(200).json({message:"Configuraciòn Actualizada"})}
            })
        } catch (error) {
            res.send({message:error})
        }
    },
    deleteConfig:async (req,res)=>{
        try {
            Configuration.findByIdAndRemove(req.params.id,(err)=>{
                if(err){
                    console.log(err)
                }else{
                    res.status(200).json({mesage:"Se ha eliminado la configuraciòn"})
                }
            })
        } catch (error) {
            res.send({message:error})
        }
    }
}
module.exports = config
