const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// TODO: Move to config file or environment variables
const DB_HOST = '127.0.0.1';
const DB_PORT = '27017';
const DB_NAME = 'pfupDB';

// Perform initial connection
mongoose.connect(
    "mongodb://" + DB_HOST + ":" + DB_PORT + "/" + DB_NAME,
    { useNewUrlParser: true })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });

/**
 * List of stuff for the API design
 * TODO: Implement paging and sorting on GET.
 * TODO: Follow the HATEOAS principle.
 * TODO: Add validation code for POST,PUT,PATCH.
 * TODO: Make PUT overwrite whole document of an entity.
 */

// Mongoose Models
const Post = mongoose.model('Post', {
    'memberName': String,
    'dateCreated': Date,
    'eventURL': String,
    'title': String,
    'body': String
});

// Resource Endpoints

// GET
router.get('/', async (req, res, next) => {
    const posts = await Post.find();
    res.json(posts);
});

// GET with ID filter 
router.get('/:id', (req, res, next) => {
    Post.findById(req.params.id)
        .then((result) => {
            result = result.toJSON();
            delete result.__v;
            res.status(200).send(result);
        }).catch((err) => {
            res.status(404).send();
        });
});

// POST
router.post('/', async (req, res, next) => {
    // TODO: add validation layer
    new Post(req.body)
        .save()
        .then((result) => {
            res.status(201).json(result);
        });
});

// PUT
router.put('/:id', (req, res, next) => {
    Post.findOneAndUpdate({_id: req.params.id}, req.body)
        .then((result) => {
            res.status(204).send();
        });
});

// PATCH
router.patch('/:id', (req, res, next) => {
    Post.findOneAndUpdate({_id: req.params.id}, req.body)
        .then((result) => {
            res.status(204).send();
        });
});

// DELETE with ID filter
router.delete('/:id', (req, res, next) => {
    Post.findOneAndDelete({_id: req.params.id})
        .then((result) => {
            res.status(204).send();
        })
        .catch((err) => {
            res.status(404).send();
        });
});

module.exports = router;
