const express = require('express')
const router = express.Router()
const {protect, admin, doctor} = require('../middleware/authMiddleware')



module.exports = router