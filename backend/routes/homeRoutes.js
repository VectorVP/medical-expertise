const express = require('express')
const router = express.Router()
const {protect, admin, doctor} = require('../middleware/authMiddleware')

const { getInfoAboutAllReports } = require('../controllers/homeController')

router.route('/')
    .get(getInfoAboutAllReports)
    // .post(protect, createProductReview)
// router.route('/create')
//     .post(protect, doctor, createNew)

module.exports = router