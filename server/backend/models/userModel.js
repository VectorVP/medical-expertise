const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const bcrypt = require('bcryptjs')

const reviewSchema = Schema({
    name: { type: String, required: true},
    rating: { type: Number, required: true },
    comment: { type: String },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
}, {
    timestamps: true
})

const subSchema = Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
})

const userSchema = Schema({
    // стандартно для всех пользователей
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    image:String,
    // проверка - если доктор: при регистрации чекбокс и заполение полей доктора, при логине проверка этого поля в middleware
    isDoc:{
        type: Boolean,
        required: true,
        default: false,
    },
    subscriptions: [ subSchema ],
    qualification: {
        type: String,
    },
    specialty: {
        type: String,
    },

    // при логине проверка этого поля в middleware
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },

    // сброс - восстановение пароля
    resetToken: String,
    resetTokenExp: Date,

    avatarUrl: String,
   
    // отзывы о докторе
    docReview: [ reviewSchema ],

    // цена за услугу, рейтинг, количество отзывов
    price: {
        type: String,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
}, {
       timestamps: true
})

// для проверки паролей
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compareSync(enteredPassword, this.password)
}
userSchema.pre('save', async function (next) { // перед тем как сохранить, можно что-то сделать, например, зашифровать пароль
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

module.exports = User