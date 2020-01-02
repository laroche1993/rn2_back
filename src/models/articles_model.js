const mongoose = require('mongoose')
const { Schema } = mongoose
const user = mongoose.model('Users')
const moment  =require('moment')

const articles = new Schema(
    {
        title:String,
        category: String,
        date:{
            type:Date,
            default:moment().format()
        },
        user:{
            type:Schema.Types.ObjectId,
            ref:'Users'
        }

    }
)
module.exports = mongoose.model('articles',articles)