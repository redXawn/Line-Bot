const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const env = require('dotenv');
const path = require('path');
const line = require('@line/bot-sdk');

const port = process.env.PORT || 3000;
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

env.config({path: envPath})


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new line.Client(config);

app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result))
      .catch((err) => {
    console.error(err);
    res.status(500).end();
  });
});

  function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
      // ignore non-text-message event
      return Promise.resolve(null);
    }
    var options = {
      method: 'GET',
      url: 'https://api.susi.ai/susi/chat.json',
      qs: {
        timezoneOffset: '-330',
        q: event.message.text
    }
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    // answer fetched from susi
    var ans = (JSON.parse(body)).answers[0].actions[0].expression;
    // create a echoing text message
    const answer = {
        type: 'text',
        text: ans
    };
    // use reply API
    return client.replyMessage(event.replyToken, answer);
})
}

app.get('/', function (req, res) {
  res.send({message: `Welcome`});
});
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

module.exports = app