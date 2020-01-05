const nodemailer = require('nodemailer')
const { config } = require('../config/config')


const SendMail = {

    sendMail: async (req, res, next) => {
        console.log(config.emailConfig.auth.user)
        const configurationTransport = config.emailConfig
        console.log(configurationTransport)
        //Create transporter nodemailer with the configuration from config file
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth:{
                user:"luisangelrochebroche@gmail.com",
                pass:"Eneidateamo"
            }
        })
        
        //send email whith the user info
        try {
            const info = await transporter.sendMail({
                from: "luisangelrochebroche@gmail.com",
                to: "luisangelrochebroche@gmail.com",
                subject: 'Comprar autos',
                text: req.body.body
            })
            console.log(info)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }



    }
}

module.exports = SendMail;