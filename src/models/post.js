const mongoose = require('mongoose'); // Importando biblioteca

const PostSchema = new mongoose.Schema({
    postTitle: String,
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes:{
        type: Number,
        default: 0,
    }
},{
    timestamps: true,
});

module.exports = mongoose.model('Post',PostSchema);