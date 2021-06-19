const asyncHandler = require('express-async-handler')
// @desc    Create a new by doctor
// @route   POST /api/home/create
// @access  Doctor
const postDataFromMK = asyncHandler(
    async (req, res) => {
        console.log("message from mk ", req.body)
        res.status(201).json({message: 'New added'})
    }
)


module.exports = { postDataFromMK }