const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const env = require('dotenv');
const line = require('@line/bot-sdk');

const port = process.env.PORT || 3000;
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.send({message: 'Welcome'});
});
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

module.exports = app