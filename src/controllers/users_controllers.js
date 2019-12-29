//import schema from mongoose
const Users = require('../models/users_model')


const userController = {

    getUser: async (req, res) => {
        try {
            const users = await Users.find()
            res.json(users)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    getUserbyId: async (req, res) => {
        try {
            const user = await Users.findById(req.params.id)
            res.json(user)
        } catch (error) {
            res.status(500).send(error)
        }

    },
    addUser: async (req, res) => {
        try {

            //get all parameters separately to precess them
            const { name, userName, password, rol } = req.body
            //verify if exist the user
            if (userName) {
                const existUser = await Users.findOne({ userName })
                console.log(existUser)
                if (existUser) {
                    res.json("este usuario ya exite")
                } else {
                    //save de new user                    
                    const newUser = new Users({ name, userName, password, rol });
                    newUser.password = await newUser.encryptPassword(password)
                    console.log(newUser.password)
                    await newUser.save()
                    res.status(202).send()
                }
            } else {
                res.json("Introducir el userName")
            }


        } catch (error) {
            res.status(500).send(error)
        }
    },
    updateUser: async (req, res) => {
        try {
            //get password parameters separately to precess them
            const { name, userName, password, rol } = req.body
            console.log(password)
            //validate that no repit the same useName
            if(userName){
                const userExist = await Users.findOne({userName})                
                if(!userExist){
                    //object User for encrypt the password
            const newUser = new Users({ name, userName, password, rol });
            req.body.password = await newUser.encryptPassword(password)
            Users.findByIdAndUpdate(req.params.id, req.body, (err) => {
                if (err)
                    console.log(err)
                else {
                    res.status(202).send()
                }
            })
                }else{
                    res.status(400).json({mesage:"Ya existe este userName"})
                }
            }
            

        } catch (error) {
            res.status(500).send(error)
        }

    },
    deleteUser: async (req, res) => {
        await Users.findByIdAndRemove(req.params.id)
        res.status(200).json({mesage:"Usuario eliminado correctamente"})

    }
}
module.exports = userController;