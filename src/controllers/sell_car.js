const nodemailer = require('nodemailer')
//template
const handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')
const dir = require('../config')

//read file hbs
const source = fs.readFileSync(path.join(dir, '/static/sell_car.hbs'), 'utf8')
//compiled for send 
const template = handlebars.compile(source)


const SendMailSell = {

    sendMailSell: async (req, res, next) => {

        //recive from user (email,infoCar)  
        console.log(req.body)
        const {user,auto} = req.body
        

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
                to: process.env.USER_EMAIL,
                subject: 'Vender autos',
                html:template({user,auto})
            })
            console.log(info)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
//Sending other email to the employed of the company with other info
        try {
            const info = await transporter.sendMail({
                from: process.env.USER_EMAIL,
                to: process.env.USER_EMAIL,
                subject: 'Vender autos copia al jefe',
                html:template({user,auto})
            })
            console.log(info)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

        console.log("se ejecuta despues de enviar el mensaje")


    }
}

module.exports = SendMailSell;