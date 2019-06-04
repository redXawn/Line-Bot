const line = require('@line/bot-sdk');
const config = {
  channelAccessToken: 'Z3qpzXo34RTfgLgYj4x2bVs/r3JcYGWmtIPtGfMGkQgSb5lVU1iwrvcHuPSOHzmAwuF/Bgm4hCwX7VAqHyi13iYAu1M4+2p7ACwJI4qeYWKiCQqStZAoFKCNbnbFdmuMVlr+6OBzFVHi4epUT8JlVgdB04t89/1O/w1cDnyilFU=',
  channelSecret: '657080c4d5f25f89e85bbe466e68acf3',
};
const client = new line.Client(config);

const axios = require('../utils/api')

module.exports = {
  callback(req, res) {
    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result))
      .catch((err) => {
        console.error(err);
        res.status(500).end();
      });
  },
  
  // event handler
  handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
      // ignore non-text-message event
      return Promise.resolve(null);
    }
  
    // create a echoing text message
    const echo = { type: 'text', text: event.message.text };
  
    // use reply API
    return client.replyMessage(event.replyToken, echo);
  }
}