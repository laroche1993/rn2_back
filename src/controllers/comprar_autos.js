const nodemailer = require('nodemailer')
const { config } = require('../config/config')


const SendMail = {

    sendMail: async (req, res, next) => {
        console.log(config.emailConfig.auth.user)
        const configurationTransport = config.emailConfig
        //Create transporter nodemailer with the configuration from config file
        const transporter = nodemailer.createTransport({ configurationTransport })
        
        //send email whith the user info
        try {
            const info = await transporter.sendMail({
                from: config.emailConfig.auth.user,
                to: req.body.email,
                subject: 'Comprar autos',
                text: req.body.body,
                html='<h1> COmpra de autos</h1>'
            })
            console.log(info)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }



    }
}

module.exports = SendMail;