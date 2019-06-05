const axiosMethod = require('../utils/api');

module.exports = {
  checkStatus(req, res) {
    res.send(asd)
  },

  authenticationUser(req, res) {
    console.log('req', req.body.events)
    const body = {
      response_type: 'code',
      client_id: ''
    }
    axiosMethod('POST', 'https://access.line.me/oauth2/v2.1/authorize', body)
  },

  generateToken(req, res) {
    console.log('req', req.body.events)
    const body = {
      grant_type: 'authorization_code',
      
    }
    axiosMethod('POST', 'https://api.line.me/oauth2/v2.1/token', body)
  },
}

