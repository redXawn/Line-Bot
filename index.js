const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const env = require('dotenv');
const line = require('@line/bot-sdk');
const middleware = require('@line/bot-sdk').middleware

const lineRoute = require('./routes/line-bot')

const config = {
  channelAccessToken: 'u/I+5h8Y2umj2prueCGNZZU56dMUxoMCFRHmG79bNT42BQTEqd1DukS4Vp6Z7VErwuF/Bgm4hCwX7VAqHyi13iYAu1M4+2p7ACwJI4qeYWL2tcNSPDwzSHDz2A/+VhvQNlGzbF//su0cs5fD/MSaJgdB04t89/1O/w1cDnyilFU=',
  channelSecret: '657080c4d5f25f89e85bbe466e68acf3',
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
