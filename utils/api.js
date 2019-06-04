const axios = require('axios');

module.exports = {
  post(url, headers, body) {
    axios({
      method: 'POST',
      url: url,
      headers: {
        authorization: headers
      },
      data: body
    })
  },

  get(url, headers) {
    axios({
      method: 'GET',
      url: url,
      headers: {
        authorization: headers
      }
    })
  }
}