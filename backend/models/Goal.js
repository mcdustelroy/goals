const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true],
        ref: 'User'
    },
    text: {
        type: String,
        required: [true, 'Please add a text value.']
        }
    }, 
    { 
        timestamps: true  // makes an updated at and created at field
    }
)

module.exports = mongoose.model('Goal', goalSchema) 