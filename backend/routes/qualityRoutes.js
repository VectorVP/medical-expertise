const express = require('express')
const router = express.Router()
// const {protect, admin} = require('../middleware/authMiddleware') // проверка на вид пользователя

const  { uploadFile } = require('../controllers/qualityController')

router.route('/').post(uploadFile)


module.exports = router