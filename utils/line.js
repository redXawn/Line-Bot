const Crypto = require('crypto');
const line = require('@line/bot-sdk');
const config = {
  channelAccessToken: 'NQmHX/A7rF+Y7hgFipkfli8osvFvznjbd/hjKU5yvZQ1fcBdAPxFUOI93iB1+B7RwuF/Bgm4hCwX7VAqHyi13iYAu1M4+2p7ACwJI4qeYWIGR2OMAGIQQ0aW0BR4S5RqTLKRc/UZ5PmvTKzXwcseagdB04t89/1O/w1cDnyilFU=',
  channelSecret: '657080c4d5f25f89e85bbe466e68acf3',
};
const client = new line.Client(config);

module.exports.lineVerifier = (req, res, next) => {
  const signature = req.headers['x-line-signature'];
  if ( signature === Crypto.createHmac('sha256', process.env.LINE_CHANNEL_SECRET).digest('base64') ) {
    next()
  } else {
    return res.status(500).send({
      message: 'Not From Line'
    })
  }
};

module.exports.handleEvent = (event) => {
  console.log('event', event)
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}