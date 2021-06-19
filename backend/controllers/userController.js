const asyncHandler = require('express-async-handler')
const User = require('../models/userModel') 
const generateToken = require('../utils/generateToken')

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body
    console.log('req body ', req.body)
    console.log("email ", email, "+  password ", password)
    const user = await User.findOne({ email })
    console.log("user ", user)
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isDoc: user.isDoc,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error(error, 'Invalid email or password')
    }
})

// @desc    Register user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler( async (req, res) => {
    const { email, password, name, qualification, price, specialty } = req.body
    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400)
        throw new Error('User already exist')
    } 
    if ( qualification !== '' ||  price !== '' || specialty !== '' ) {
        const user = await User.create({
            name,
            email,
            password,
            isDoc: true,
            qualification,
            specialty,
            price,
        })
        if(user){
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                isDoc: user.isDoc,
                token: generateToken(user._id)
            })
        }else{
            res.status(400)
            throw new Error('Invalid user data') 
        }
    } else {
        const user = await User.create({
            name,
            email,
            password,
        })

        if(user){
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
        }else{
            res.status(400)
            throw new Error('Invalid user data') 
        }
    }

  
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler( async (req, res) => {
    
    const user = await User.findById(req.user._id)
    if (user) {
      res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isDoc: user.isDoc,
      })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
  })

module.exports = { authUser, registerUser, getUserProfile }