const { success, failed } = require('../utils/response');
const { findUser } = require('../utils/models/user');
const { replyMessageApi } = require('../services/line-services');
const { checkMessageService } = require('../services/check-message');

module.exports = {
  async replyMessage(req, res, event) {
    try {
      const { replyToken, source, message } = event;
      const lineId = source.userId
      if (message.type === 'text' || message.type === 'message') {
        checkMessageService(req, res, event)
      } else {
        // for replying sticker
        const userData = await findUser('line_user_id', lineId)
        const body = {
          replyToken: replyToken,
          messages:[
            {
              "type":"text",
              "text": `Hai ${userData.name}, apa yang bisa dibantu ?`
            },
            {
              "type":"text",
              "text": `ketik help untuk melihat bantuan`
            }
          ]
        }
        const response = await replyMessageApi(body)
        success(req, res, response.data)
      }
    } catch (error) {
      failed(req, res, error)
    }
  }
}