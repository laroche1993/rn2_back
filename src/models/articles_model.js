const mongoose = require('mongoose')
const { Schema } = mongoose
const user = mongoose.model('Users')

const articles = new Schema(
    {
        title:String,
        category: String,
        date:{
            type:Date,
            default:Date.now
        },
        user:{
            type:Schema.Types.ObjectId,
            ref:'Users'
        }

    }
)
module.exports = mongoose.model('articles',articles)