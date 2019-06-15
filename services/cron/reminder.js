const CronJob = require('cron').CronJob;
const user = require('../../server/models').user;
const bitcoin = require('../../server/models').bitcoin;
const reminder = require('../../server/models').reminder;
const { success, notFound, failed } = require('../../utils/response');
const { findUser } = require('../../utils/models/user');
const { pushMessageApi } = require('../line-services');
const { getCoin } = require('../indodax-services')

module.exports = {
  reminderMessage() {
    new CronJob('*/3 * * * *', async function() {
      try {
        const reminderData = await reminder.findAll(
          {
            include: [
              {
                model: bitcoin,
                attributes: ['bitcoin_code']
              },
              {
                model: user,
                attributes: ['line_user_id']
              }
            ]
          })
        reminderData.map(async data => {
          const bitcoinResponse = await getCoin(data.bitcoin.bitcoin_code)
          const lastPrice = parseInt(bitcoinResponse.data.ticker.last)
          if (lastPrice <= data.reminder_price && data.active === true) {
            const body = {
              to: data.user.line_user_id,
              messages:[
                {
                  "type":"text",
                  "text": `Harga koin ${data.bitcoin.bitcoin_code} sudah dibawah / sama dengan ${data.reminder_price.toLocaleString(['ban', 'id'])}, harga sekarang adalah ${lastPrice.toLocaleString(['ban', 'id'])}`
                }
              ]
            }
            pushMessageApi(body)
          } else {
            return
          }
        })
      } catch(error) {
        console.log(error)
        const body = {
          to: userData.line_user_id,
          messages:[
            {
              "type":"text",
              "text": "Terjadi kesalahan pada reminder servis"
            }
          ]
        }
        pushMessageApi(body)
        failed(req, res, "Error reminder")
      }
    }, null, true, 'Asia/Bangkok')
  },
}
