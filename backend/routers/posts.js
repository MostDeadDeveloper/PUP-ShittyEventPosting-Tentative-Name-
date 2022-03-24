const express = require('express')
const router = express.Router()

/**
 * List of stuff for the API design
 * TODO: Implement paging and sorting on GET.
 * TODO: Follow the HATEOAS principle.
 * TODO: Add validation code for POST,PUT,PATCH.
 * TODO: Make PUT overwrite whole document of an entity.
 */

// Mongoose Models
const Post = require('../models/post')

// Resource Endpoints

// GET
router.get('/', async (req, res, next) => {
  res.json(await Post.find())
})

// GET with ID filter
router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id)
    .then((result) => {
      result = result.toJSON()
      delete result.__v
      res.status(200).send(result)
    })
    .catch((err) => {
      res.status(404).send(err)
    })
})

// POST
router.post('/', (req, res, next) => {
  // TODO: add validation layer
  new Post(req.body).save().then((result) => {
    res.status(201).json({
      message: 'Successfully created Post.',
      result
    })
  })
})

// PUT
router.put('/:id', (req, res, next) => {
  Post.findOneAndUpdate({ _id: req.params.id }, req.body).then((result) => {
    res.status(204).send({
      message: 'Successfully updated Post.',
      result
    })
  })
})

// PATCH
router.patch('/:id', (req, res, next) => {
  Post.findOneAndUpdate({ _id: req.params.id }, req.body).then((result) => {
    res.status(204).send({
      message: 'Successfully updated Post.',
      result
    })
  })
})

// DELETE with ID filter
router.delete('/:id', (req, res, next) => {
  Post.findOneAndDelete({ _id: req.params.id })
    .then((result) => {
      res.status(204).send({
        message: 'Successfully removed Post.'
      })
    })
    .catch((err) => {
      res.status(404).send(err)
    })
})

module.exports = router
