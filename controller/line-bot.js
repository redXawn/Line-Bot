const { axiosHelper } = require('../utils/api');

module.exports = {
  pushMessage(req, res) {
    const body = {
      to: process.env.USER_ID,
      messages:[
        {
          "type":"text",
          "text":"Hello, world1"
        },
        {
          "type":"text",
          "text":"Hello, world2"
        }
      ]
    }
    axiosHelper('POST', 'https://api.line.me/v2/bot/message/push', JSON.stringify(body))
    .then(response => {
      res.send('send')
    })
    .catch(err => {
      console.log(err)
      res.send(err)
    })
  }
}