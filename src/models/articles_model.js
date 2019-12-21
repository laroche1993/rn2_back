const mongoose = require('mongoose')
const { Schema } = mongoose

const articles = new Schema(
    {
        title:String,
        category: String,
        date:{
            type:date,
            default:Date.now
        }

    }
)
module.exports = mongoose.model('articles',articles)