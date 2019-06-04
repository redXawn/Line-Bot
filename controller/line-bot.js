const line = require('@line/bot-sdk');
const config = {
  channelAccessToken: 'u/I+5h8Y2umj2prueCGNZZU56dMUxoMCFRHmG79bNT42BQTEqd1DukS4Vp6Z7VErwuF/Bgm4hCwX7VAqHyi13iYAu1M4+2p7ACwJI4qeYWL2tcNSPDwzSHDz2A/+VhvQNlGzbF//su0cs5fD/MSaJgdB04t89/1O/w1cDnyilFU=',
  channelSecret: '657080c4d5f25f89e85bbe466e68acf3',
};
const client = new line.Client(config);

const axios = require('../utils/api')

module.exports = {
  checkStatus(req, res) {
    console.log('status')
    res.send('ok')
  },

  generateToken(req, res) {
    console.log('req', req.body.events)
    const body = {
      grant_type: 'authorization_code',
      
    }
    axios.post('post', 'https://api.line.me/oauth2/v2.1/token', )
  },

  callback(req, res) {
    console.log(config)
    res.send('callback')
  }
}