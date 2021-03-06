const nodemailer = require('nodemailer')
const autos = require('./cars_controllers')
//template
const handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')
const dir = require('../config')

//read file hbs
const source = fs.readFileSync(path.join(dir, '/static/buy_car.hbs'), 'utf8')
//compiled for send 
const template = handlebars.compile(source)

const SendMail = {

    sendMail: async (req, res, next) => {
        
        //recive from user (email,carId)
        //get the car and user info
        console.log(req.body)
        let  getInfoCars
        if (req.body.carId) {

            try {
                getInfoCars = await autos.getCarsForEmail(req.body.carId)
            } catch (error) {
                res.status(500).send(error)
            }
            
        }else{
            res.json({error: "There are not a autoId"})
        }
       
          console.log(getInfoCars)

        
        const infoCars = getInfoCars[0]
        const infoUser = req.body

        //Create transporter nodemailer with the configuration from env file
        const transporter = nodemailer.createTransport({
            service: process.env.SERVICE_MAIL,
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.PASS_EMAIL
            }
        })

        //send email with the user info

        try {
            await transporter.sendMail({
                from: process.env.USER_EMAIL,
                to: [req.body.email, process.env.USER_EMAIL],
                subject: 'Comprar autos',
                html: template({ infoUser,infoCars })
            }, (err) => {
                console.log(err)
                res.status(500).send(err)
            })
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }
}

module.exports = SendMail;