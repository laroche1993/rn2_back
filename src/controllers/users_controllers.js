//import schema from mongoose
const Users = require('../models/users_model')


const userController = {

    getUser: async (req, res) => {
        try {
            const users = await Users.find()
            res.json(users)
        } catch (error) {
            console.log(error)
        }
    },
    getUserbyId: async (req, res) => {
        try {
            const user = await Users.findById(req.params.id)
            res.json(user)
        } catch (error) {
            res.status(203)
        }

    },
    addUser: async (req, res) => {
        try {

            //get all parameters separately to precess them
            const { name, userName, password, rol } = req.body
            //verify if exist the user       
            const exist_user = await Users.findOne({ userName })
            console.log(exist_user)
                if (exist_user) {                    
                    res.json("este usuario ya exite")
                } else {
                    //save de new user                    
                    const new_user = new Users({ name, userName, password, rol });
                    new_user.password = await new_user.encryptPassword(password)
                    console.log(new_user.password)
                    await new_user.save()
                    res.status(202).send()
                }
            
        } catch (error) {
            res.status(203)
        }
    },
    updateUser: async (req, res) => {
        try {
            Users.findByIdAndUpdate(req.params.id, req.body)
            res.status(202)
        } catch (error) {
            res.status(203)
        }

    },
    deleteUser: async (req, res) => {
        await Users.findByIdAndRemove(req.params.id)
        res.send("user deleted")

    }
}
module.exports = userController;