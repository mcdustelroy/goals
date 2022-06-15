const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 8000
const { errorHandler } = require('./middleware/errorMiddleware')

const app = express()

// access req.body data
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/goals', require('./routes/goalRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server listening on port ${port}`))