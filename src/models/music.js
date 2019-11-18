const mongoose = require('mongoose')

const MusicSchema = new mongoose.Schema({
    musicName: String,
    image: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        require: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Music', MusicSchema)