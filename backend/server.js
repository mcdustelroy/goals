const express = require('express')
const connectDB = require('./config/db')
const path = require('path')
const dotenv = require('dotenv').config();
const app = express()
const { errorHandler } = require('./middleware/errorMiddleware')

connectDB()

// access req.body data
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))


// Serve statis assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
      )
    );
  } else {
    app.get('/', (req, res) => res.send('Please set to production'));
  }

// Error Handler
app.use(errorHandler)

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server listening on port ${port}`))
