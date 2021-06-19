const express = require('express')
const router = express.Router()
const {protect, admin} = require('../middleware/authMiddleware') // проверка на вид пользователя


const {
    authUser, 
    registerUser,
    getUserProfile,
} = require('../controllers/userController')



// router.route('/').get(protect, admin, getUsers)
router.post('/login' , authUser)
router.route('/register').post(registerUser)
router.route('/profile')
        .get(protect, getUserProfile)
        // .put(protect, updateUserProfile)
// router.route('/:id')
//         .delete(protect, admin, deleteUser)
//         .put(protect, admin, updateUser)
//         .get(protect, admin, getUserById)


// module.exports = router

module.exports = router