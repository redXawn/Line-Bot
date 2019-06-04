const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const env = require('dotenv');
const line = require('@line/bot-sdk');
const middleware = require('@line/bot-sdk').middleware

const lineRoute = require('./routes/line-bot')

const config = {
  channelAccessToken: '6JMxJk3lxVroozKbELsTnlkECPFgH+STEYuZCL7Yec/Q8Uj8XljPk33mTDfypMyoB0S1m5a2AAbOVt7XJAc1xxx9eoV6utk6onAGUArsBqWirt7OPLgrue+NJXx5UBaeKSYoPhESe/+lnQ3tU/eaVgdB04t89/1O/w1cDnyilFU=',
  channelSecret: '7b18b21b6a1c6192897fee3ef720572f',
};

const app = express();

app.use(logger('dev'));

app.use('/line', lineRoute)
app.use(bodyParser.json())

app.get('/', (req, res) => res.status(200).send({
  message: 'Line Bot Example',
}));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

app.use(function(req, res, next) {
  res.status(404).send({message: 'Not Found'})
});

module.exports = app;
