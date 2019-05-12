const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const env = require('dotenv');
const line = require('@line/bot-sdk');

const app = express();

const nodeEnv = process.env.NODE_ENV;
let envPath
if (nodeEnv === 'development') {
  envPath = path.resolve('.env.development');
} else if (nodeEnv === 'test') {
  envPath = path.resolve('.env.test');
} else if (nodeEnv === 'production') {
  envPath = path.resolve('.env.production');
}

// Log requests to the console.
app.use(logger('dev'));
env.config({path: envPath})

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('/', (req, res) => res.status(200).send({
  message: 'Line Bot Example',
}));

app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

app.use(function(req, res, next) {
  res.status(404).send({message: 'Not Found'})
});

module.exports = app;
