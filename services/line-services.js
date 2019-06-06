const { axiosHelper } = require('../utils/api');
module.exports = {
  pushMessageApi(form) {
    return axiosHelper('POST', 'https://api.line.me/v2/bot/message/push', JSON.stringify(form))
  },

  getUserIdApi(lineUserId) {
    return axiosHelper('GET', `https://api.line.me/v2/bot/profile/${lineUserId}`)
  },

  replyMessageApi(form) {
    return  axiosHelper('POST', 'https://api.line.me/v2/bot/message/reply', JSON.stringify(form))
  }
}