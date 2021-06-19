const asyncHandler = require('express-async-handler')
const New = require('../models/newsModel')
const User = require('../models/userModel')

// @desc    Fetch all doc's news
// @route   GET /api/home
// @access  Public
const getInfoAboutAllReports = asyncHandler(
    async (req, res) => {
        console.log("req.user ", req.user)
        const news = await New.find({})
        const docs = await User.find({ isDoc:true })
        res.json({news, docs})
    }
)


module.exports = { getInfoAboutAllReports }