const mongoose = require('mongoose')

const MusicSchema = new mongoose.Schema({
    musicName: {
        type: String,
        require: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        require: true,
    },
    image: {
        type: String,
        require: true, 
    } 
})

module.exports = mongoose.model('Music', MusicSchema)