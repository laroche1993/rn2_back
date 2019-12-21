const Users = require('../../models/users_model')
const jwt = require('jsonwebtoken')

const login = {

    loginUser: async (req, res, next) => {

        //verify if exist the user
        const { userName, password } = req.body
        const user = await Users.findOne({ userName })
        if (!user) {
            res.json({ mesage: "No existe el usuario" })
        } else {
            //match pasword
            const matchPass = await user.matchPassword(password)

            if (!matchPass) {
                res.json({ mesage: "Contraseña incorrecta" })
            } else {
                //create token
                const userSend = {
                    name: user.name,
                    userName: user.userName,
                    rol: user.rol
                }
                const token = jwt.sign({ userSend }, process.env.JWT_WORLD)
                res.json({ mesage: "Usuario logeado con exito", token })
            }
        }


        next()

    }
}
module.exports = login