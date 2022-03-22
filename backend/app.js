const PORT = process.env.PORT || 8000;
const HOSTNAME = process.env.HOSTNAME || '127.0.0.1';

// API stuff
const API_PREFIX_START = '/api/';
const API_VERSION = 1;
const API_PREFIX = API_PREFIX_START + 'v' + API_VERSION;

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const express = require('express');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// API routers
app.use(API_PREFIX + "/posts", require('./routers/posts'));

app.listen(PORT, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}`);
});
