'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: '6JMxJk3lxVroozKbELsTnlkECPFgH+STEYuZCL7Yec/Q8Uj8XljPk33mTDfypMyoB0S1m5a2AAbOVt7XJAc1xxx9eoV6utk6onAGUArsBqWirt7OPLgrue+NJXx5UBaeKSYoPhESe/+lnQ3tU/eaVgdB04t89/1O/w1cDnyilFU=',
  channelSecret: '7b18b21b6a1c6192897fee3ef720572f',
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});