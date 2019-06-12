const CronJob = require('cron').CronJob;
// const user = require('../server/models').user;
const { success, notFound, failed } = require('../utils/response');
const { findUser } = require('../utils/models/user');
const { pushMessageApi } = require('../services/line-services');

new CronJob('*/2 * * * *', function() {
  try {
    console.log('send hi')
    const userData = await findUser('id', 1)
    if (!userData) {
      return notFound(req, res, null)
    }
    const body = {
      to: userData.line_user_id,
      messages:[
        {
          "type":"text",
          "text": "Hi"
        }
      ]
    }
    const response = await pushMessageApi(body)
    success(req, res, response.config.data)
  } catch(error) {
    failed(req, res, error)
  }
}, null, true, 'Asia/Bangkok')