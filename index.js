const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const env = require('dotenv');

const lineRoute = require('./routes/line-bot')
const callbackRoute = require('./routes/callback')

require('dotenv').config()

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/line', lineRoute)
app.use('/callback', callbackRoute)

app.get('/', (req, res) => res.status(200).send({
  message: 'Line Bot Example',
}));
console.log('access', process.env.LINE_CHANNEL_ACCESS)
console.log('secret', process.env.LINE_CHANNEL_SECRET)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

app.use(function(req, res, next) {
  res.status(404).send({message: 'API Not Found'})
});

module.exports = app;
