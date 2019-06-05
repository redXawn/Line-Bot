const { axiosHelper } = require('../utils/api');

module.exports = {
  pushMessage(req, res) {
    const body = {
      to: 'U56c13af3611d73c673faae161d1f4b86',
      messages:[
        {
          "type":"text",
          "text":"Jahat dikatain creep"
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