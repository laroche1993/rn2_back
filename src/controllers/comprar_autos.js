const nodemailer = require('nodemailer')
const { config } = require('../config/config')
const autos = require('./cars_controllers')


const SendMail = {

    sendMail: async (req, res, next) => {

        //recive from user (email,carId)
        //get the car info
        const getInfoCars = await autos.getCarsForEmail(req.body.carId)
        const infoCars = getInfoCars[0]

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
                to: req.body.email,
                subject: 'Comprar autos',
                text: infoCar
            })
            console.log(info)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }



    }
}

module.exports = SendMail;