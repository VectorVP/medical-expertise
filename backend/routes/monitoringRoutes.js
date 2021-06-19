const express = require('express')
const router = express.Router()
const {protect, admin, doctor} = require('../middleware/authMiddleware')

const { postDataFromMK } = require('../controllers/monitoringController')

router.route('/')
    .post(postDataFromMK)

module.exports = router