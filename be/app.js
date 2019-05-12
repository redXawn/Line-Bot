const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const env = require('dotenv');
const line = require('@line/bot-sdk');

// Set up the express app
const app = express();

// Routes
// const line = require('./routes/line-bot')

const nodeEnv = process.env.NODE_ENV;
let envPath
if (nodeEnv === 'development') {
  envPath = path.resolve('.env.development');
} else if (nodeEnv === 'test') {
  envPath = path.resolve('.env.test');
} else if (nodeEnv === 'production') {
  envPath = path.resolve('.env.production');
}

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};

// Log requests to the console.
app.use(logger('dev'));
env.config({path: envPath})

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use('/', line);

app.use(function(req, res, next) {
  res.status(404).send({message: 'Not Found'})
});

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('/', (req, res) => res.status(200).send({
  message: 'Line Bot Example',
}));

module.exports = app;