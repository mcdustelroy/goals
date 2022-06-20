const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        // const conn = await mongoose.connect('mongodb+srv://dustin:dustin@cluster0.ayowv4h.mongodb.net/?retryWrites=true&w=majority')

        console.log(`mongoDB connected: ${conn.connection.host}`)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB