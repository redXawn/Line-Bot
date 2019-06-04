const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const env = require('dotenv');
const line = require('@line/bot-sdk');
const middleware = require('@line/bot-sdk').middleware

const lineRoute = require('./routes/line-bot')
const exampleRoute = require('./routes/example')

const config = {
  channelAccessToken: 'Z3qpzXo34RTfgLgYj4x2bVs/r3JcYGWmtIPtGfMGkQgSb5lVU1iwrvcHuPSOHzmAwuF/Bgm4hCwX7VAqHyi13iYAu1M4+2p7ACwJI4qeYWKiCQqStZAoFKCNbnbFdmuMVlr+6OBzFVHi4epUT8JlVgdB04t89/1O/w1cDnyilFU=',
  channelSecret: '657080c4d5f25f89e85bbe466e68acf3',
};
const nodeEnv = process.env.NODE_ENV;
let envPath = ''
if (nodeEnv === 'development') {
  envPath = path.resolve('.env.dev');
} else if (nodeEnv === 'test') {
  envPath = path.resolve('.env.test');
} else if (nodeEnv === 'production') {
  envPath = path.resolve('.env.prod');
}
require('dotenv').config({path: envPath})

const app = express();

app.use(logger('dev'));

app.use('/line', lineRoute)
app.use('/example', exampleRoute)
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
