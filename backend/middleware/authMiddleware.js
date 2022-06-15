const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/User')

const protect = asyncHandler(async (req, res, next) => {
    const token = req.header('x-auth-token')

    if(!token) {
        res.status(401)
        throw new Error('No token, authorization denied')
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select('-password');
        next()
    } catch (err) {
        console.log(err)
        res.status(401)
        throw new Error('Not authorized')
    }
    // let token
    
    // if(req.headers?.authorization?.startsWith('Bearer')) {
    //     try {
    //         // Get token from header
    //         token = req.headers.authorization.split(' ')[1]

    //         // verify the token
    //         const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
    //         // Get user from the token
    //         req.user = await User.findById(decoded.id).select('-password')

    //         next()
    //     } catch (err) {
    //         console.log(err)
    //         res.status(401)
    //         throw new Error('Not authorized')
    //     }
    // }

    // if(!token) {
    //     res.status(401)
    //     throw new Error('Not authorized, no token')
    // }
})

module.exports = { protect }