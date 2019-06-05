const line = require('@line/bot-sdk');
const config = {
  channelAccessToken: 'NQmHX/A7rF+Y7hgFipkfli8osvFvznjbd/hjKU5yvZQ1fcBdAPxFUOI93iB1+B7RwuF/Bgm4hCwX7VAqHyi13iYAu1M4+2p7ACwJI4qeYWIGR2OMAGIQQ0aW0BR4S5RqTLKRc/UZ5PmvTKzXwcseagdB04t89/1O/w1cDnyilFU=',
  channelSecret: '657080c4d5f25f89e85bbe466e68acf3',
};
const client = new line.Client(config);

module.exports = {
  callback(req, res) {
    console.log('events', req.body)
    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => {
        console.log(result)
        res.json(result)
      })
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