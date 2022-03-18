const { LoremIpsum } = require('lorem-ipsum');
const express = require('express');
const router = express.Router();

const loremGenerator = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});

// Global TODO: Follow Hypermedia as the engine of application state (HATEOAS) principle

// TODO: temporary repository, replace later with MongoDB
var posts = [
    {
        'id': 1,
        'member_name': 'Test User',
        'date_created': new Date(),
        'event_url': 'https://www.lipsum.com/',
        'title': 'Some Shitpost Title',
        'body': loremGenerator.generateParagraphs(2)
    },
    {
        'id': 2,
        'member_name': 'Another User',
        'date_created': new Date(),
        'event_url': 'https://www.lipsum.com/',
        'title': 'Another shitpost Title',
        'body': loremGenerator.generateParagraphs(2)
    }
];

// Resource Endpoints

// GET
router.get('/', (req, res, next) => {
    res.json(posts);
});

// GET with ID filter 
router.get('/:id([0-9]{1,})', (req, res, next) => {
    var retrievedPosts = posts.filter((post) => post.id == req.params.id);
    if(retrievedPosts.length == 1)
        res.json(retrievedPosts[0]);
    else {
        res.status(404);
        res.json({ message: 'Post with specified ID does not exist.' });
    }
});

// POST
router.post('/', (req, res, next) => {
    // TODO: add validation layer
    posts.push({
        'id': posts[posts.length - 1].id + 1,
        'member_name': req.body.member_name,
        'date_created': new Date(),
        'event_url': req.body.event_url,
        'title': req.body.title,
        'body': req.body.body
    });
    res.json({
        'message': 'Successfully created post.',
        'post': posts[posts.length - 1]
    });
});

// PUT
router.put('/:id([0-9]{1,})', (req, res, next) => {
    // TODO: add validation layer
    var postIndex = posts.findIndex((post) => post.id == req.params.id);
    if(postIndex != -1) {
        // Update that specific post
        var post = posts[postIndex];
        post.member_name = req.body.member_name;
        post.date_created = req.body.date_created;
        post.event_url = req.body.event_url;
        post.title = req.body.title;
        post.body = req.body.body;
        // Return a 200 with empty body
        res.status(200);
        res.send();
    } else {
        // Return a 404 not found
        res.status(404);
        res.json({ 'message': 'Post with specified ID does not exist.' });
    }
});

// DELETE with ID filter
router.delete('/:id([0-9]{1,})', (req, res, next) => {
    var postIndex = posts.findIndex((post) => post.id == req.params.id);
    if(postIndex != -1) {
        // Remove that specific post
        posts.splice(postIndex, 1);
        // Return a 204 with empty body
        res.status(204);
        res.send();
    } else {
        // Return a 404 not found
        res.status(404);
        res.json({ 'message': 'Post with specified ID does not exist.' });
    }
});

module.exports = router;