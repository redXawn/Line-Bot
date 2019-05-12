'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const line = require('@line/bot-sdk');
const middleware = require('@line/bot-sdk').middleware

const config = {
  channelAccessToken: '6JMxJk3lxVroozKbELsTnlkECPFgH+STEYuZCL7Yec/Q8Uj8XljPk33mTDfypMyoB0S1m5a2AAbOVt7XJAc1xxx9eoV6utk6onAGUArsBqWirt7OPLgrue+NJXx5UBaeKSYoPhESe/+lnQ3tU/eaVgdB04t89/1O/w1cDnyilFU=',
  channelSecret: '7b18b21b6a1c6192897fee3ef720572f',
};

const app = express();
app.use(bodyParser.json())
// app.use('/callback', middleware(config))

app.post('/callback', (req, res) => {
  console.log('req.body', req.body)
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).send({message: 'Failed'});
    });
});

const client = new line.Client(config);
function handleEvent(event) {
  console.log('event', event.type, event.message.type)
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: 'asd'
  });
}

app.get('/', (req, res) => {
  res.send({
    message: 'Welcome'
  })
})

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});