const express = require('express')
const router = express.Router()
const {protect, admin} = require('../middleware/authMiddleware') // проверка на вид пользователя


const {
    authUser, 
    registerUser,
    getUserProfile,
} = require('../controllers/userController')

router.post('/login' , authUser)
router.route('/register').post(registerUser)
router.route('/profile')
        .get(protect, getUserProfile)

module.exports = router