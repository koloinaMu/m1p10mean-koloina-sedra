const mongoose = require('mongoose');
const Post = mongoose.model('Post', {
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    
});

module.exports = Post