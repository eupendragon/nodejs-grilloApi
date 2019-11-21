const mongoose = require('mongoose')

const ConversationSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    }],
    messages: [{
        author: {
            type: mongoose.Types.ObjectId,
            ref: 'Profile',
            required: true
        },
        message: String
    }]
})

module.exports = mongoose.model('Conversation', ConversationSchema)