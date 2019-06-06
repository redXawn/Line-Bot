const axios = require('axios');

exports.axiosHelper = (method, url, body) => { 
  return axios({
    method: method,
    url: url,
    headers: {
      ['Content-Type']: 'application/json',
      ['Authorization']: `Bearer ${process.env.LINE_CHANNEL_ACCESS}`,
    },
    data: body
  })
}
