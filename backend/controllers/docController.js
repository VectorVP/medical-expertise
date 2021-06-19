const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Fetch all doctors
// @route   GET /api/doctors
// @access  Public
const getDoctors = asyncHandler(
    async (req, res) => {
        try {
            const doctors = await User.find({ isDoc:true })
            console.log("docs", doctors)
            res.json(doctors)
        } catch (error) {
            res.status(500)
            throw new Error("Can't find doctors")
        }
    }
)

// @desc    Fetch doctor by id
// @route   GET /api/doctors/:id
// @access  Public
const getDoctorById = asyncHandler(
    async (req, res) => {
        try {
            const doctorId = req.params.id
            const doctor = await User.findById(doctorId)
            res.json(doctor)
        } catch (error) {
            res.status(500)
            throw new Error("Can't find doctor")
        }
    }
)

const addDocToSub = asyncHandler(
    async (req, res) => {
        try {
            const {
                docId,
            } = req.body
            const userId = req.user._id
            const user = await User.findById(userId)
            const subscribe = {
                userId: docId,
            }
            user.subscriptions.push(subscribe)
            res.status(201).json({message: "Subscribed"})
        } catch (error) {
            res.status(500)
            throw new Error("Can't subscribed")
        }
    }
)

module.exports = { getDoctors, getDoctorById, addDocToSub }