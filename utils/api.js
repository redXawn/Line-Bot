const axios = require('axios');

exports.axiosHelper = (method, url, body) => { 
  return axios({
    method: method,
    url: url,
    headers: {
      authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS}`,
      'Content-Type': 'application/json'
    },
    data: body
  })
}
