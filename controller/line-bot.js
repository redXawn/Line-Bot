
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
    res.send('callback')
  }
}