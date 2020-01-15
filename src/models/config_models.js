const mongoose = require('mongoose')
const { Schema } = mongoose

const configuration = new Schema(
    {
        logo: String,
        contact: {
            adress: String,
            phon: Number,
            email:String
        }

    }
)
module.exports = mongoose.model('configuration', configuration)