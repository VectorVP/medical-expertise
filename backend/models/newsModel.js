const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const likeScheme = Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const newSchema = Schema({
    doc: {
        type: String,
        require: true,
    },
    type: {
        type: String,
        required: true,
    },
    descr: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    users: [likeScheme],
    likes: {
        type: Number,
        required: true,
    },
    image:String,
},  {
    timestamps: true
})

const New = mongoose.model('New', newSchema)

module.exports = New