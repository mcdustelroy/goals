const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/User')

const protect = asyncHandler(async (req, res, next) => {
    const token = req.header('x-auth-token')
    console.log(token)

    if(!token) {
        return res.status(401).send('No token, authorization denied')
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
})

module.exports = { protect }