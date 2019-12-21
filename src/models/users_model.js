const mongoose = require('mongoose')
const {Schema} = mongoose
const bcrypt = require('bcryptjs')

const users = new Schema(
    {
        name : String,
        userName: String,  
        password: String,
        rol: String
    }

)
//this is a function that i dont needed do it here, i can do it in the controller
//generate has from a password
users.methods.encryptPassword=async (password)=>{
    const salt = await bcrypt.genSalt(10)
    const hash = bcrypt.hash(password,salt)
    return hash
};
//match passwords
users.methods.matchPassword = async function(password){
return await bcrypt.compare(password,this.password)
}

module.exports = mongoose.model('Users',users)
