const axios = require('axios');
const base64 = require('base-64');
const crypto = require('crypto');
const channelSecret = process.env.LINE_CHANNEL_SECRET

module.exports = {
  checkStatus(req, res) {
    console.log('status')
    res.send('ok')
  }
}