const asyncHandler = require('express-async-handler') // wraps try/catch
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')

// desc     Register a user
// route    POST api/users
// access   Public
const registerUser = asyncHandler(async (req, res) => {
    // validate all form info came in
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please fill out all fields.')
    }

    // Check if the user already exists
    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400) 
        throw new Error('User already exists')
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create the User
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    // check user created succesfully, send back with token
    if (user) {
        res.status(201).json({ 
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// desc     Authenticate a user
// route    POST api/users/login
// access   Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // Check for user email
    const user = await User.findOne({ email })

    // if user exists, and password is correct, return user info with token
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// desc     Get user data
// route    GET api/users/me
// access   Private
const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email } = req.user

    res.status(200).json({
        id: _id,
        name,
        email
    })
})

// generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' }) 
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}