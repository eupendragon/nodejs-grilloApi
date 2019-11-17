const mongoose = require('mongoose'); // Importando biblioteca

const PostSchema = new mongoose.Schema({
    postTitle: String,
    author: String,
    place: String,
    description: String,
    hashtags: String,
    placeEvent: String,
    image: String,
    date: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        require: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Post', PostSchema);