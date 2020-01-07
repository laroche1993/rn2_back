const nodemailer = require('nodemailer')

const SendMailSell = {

    sendMailSell: async (req, res, next) => {

        //recive from user (email,infoCar)  

        //Create transporter nodemailer with the configuration from env file
        const transporter = nodemailer.createTransport({
            service: process.env.SERVICE_MAIL,
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.PASS_EMAIL
            }
        })

        //send email whith the user info

        try {
            const info = await transporter.sendMail({
                from: process.env.USER_EMAIL,
                to: [req.body.email,process.env.USER_EMAIL],
                subject: 'Vender autos',
                text: req.body.infoCar
            })
            console.log(info)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }



    }
}

module.exports = SendMailSell;