<<<<<<< HEAD
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
=======
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
>>>>>>> a8401e8e78b538174712bb806d7179d546386e5f
