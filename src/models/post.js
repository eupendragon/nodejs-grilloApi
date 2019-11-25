const mongoose = require('mongoose'); // Importando biblioteca

const PostSchema = new mongoose.Schema({
    postTitle: String,
    description: String,
    placeEvent: String,
    image: String,
    date: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        require: true,
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('Post', PostSchema);

