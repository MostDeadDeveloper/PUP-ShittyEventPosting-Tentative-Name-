const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

const PORT = process.env.PORT || 8000
const HOSTNAME = process.env.HOSTNAME || '127.0.0.1'

// TODO: Use logger

// Database connection
let DB_URL = process.env.DB_URL
if (!DB_URL) {
  DB_URL = 'mongodb://localhost:27017/pfupDB'
  console.log(`Database configuration URL is not set. Defaulting to ${DB_URL}.`)
}
mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true })
  .catch(err => console.log(err))

// Base Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// API routers
const API_BASE_URL = process.env.API_BASE_URL || '/api/v1'
app.use(API_BASE_URL + '/posts', require('./routers/posts'))

app.listen(PORT, () =>
  console.log(`Server running at https://${HOSTNAME}:${PORT}`)
)
