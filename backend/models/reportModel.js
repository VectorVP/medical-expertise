const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const newSchema = Schema({
    age: {
        type: String,
        require: true,
    },
    type: {
        type: String,
        required: true,
    },
    mkb: {
        type: String,
        required: false,
    },
},  {
    timestamps: true
})

const Report = mongoose.model('Report', newSchema)

module.exports = Report