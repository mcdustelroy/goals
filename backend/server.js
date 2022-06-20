const express = require('express')
const connectDB = require('./config/db')
const path = require('path')

const app = express()
const { errorHandler } = require('./middleware/errorMiddleware')

connectDB()

// access req.body data
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))


// Serve statis assets in production
if (process.env.NODE_ENV === "production") {
	// Set staic folder
	app.use(express.static("client/build"));

	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
	);
} else {
    app.get('/', (req, res) => res.send('please set to production'))
}

// Error Handler
app.use(errorHandler)

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server listening on port ${port}`))
