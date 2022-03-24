const mongoose = require('mongoose');

const Post = mongoose.model('Post', {
    'memberName': {
        type: String,
        required: [true, 'Please provide a name.']
    },
    'dateCreated': Date,
    'eventURL': {
        type: String,
        required: [true, 'Provide a link to the event article.']
    },
    'title': {
        type: String,
        required: [true, 'Provide a title.']
    },
    'body': {
        type: String,
        required: [true, 'Provide a description for the event.']
    }
});

module.exports = Post;
