const CronJob = require('cron').CronJob;
const axios = require('axios');
const moment = require('moment');
const user = require('../../server/models').user;
const bitcoin = require('../../server/models').bitcoin;
const reminder = require('../../server/models').reminder;
const { success, notFound, failed } = require('../../utils/response');
const { findUser } = require('../../utils/models/user');
const { pushMessageApi } = require('../line-services');
const { getCoin } = require('../indodax-services');

module.exports = {
  reminderMessage() {
    new CronJob(
      '*/3 * * * *',
      async function () {
        try {
          const reminderData = await reminder.findAll({
            include: [
              {
                model: bitcoin,
                attributes: ['bitcoin_code'],
              },
              {
                model: user,
                attributes: ['line_user_id'],
              },
            ],
          });
          reminderData.map(async (data) => {
            const bitcoinResponse = await getCoin(data.bitcoin.bitcoin_code);
            const lastPrice = parseInt(bitcoinResponse.data.ticker.last);
            if (lastPrice <= data.reminder_price && data.active === true) {
              const body = {
                to: data.user.line_user_id,
                messages: [
                  {
                    type: 'text',
                    text: `Harga koin ${
                      data.bitcoin.bitcoin_code
                    } sudah dibawah / sama dengan ${data.reminder_price.toLocaleString([
                      'ban',
                      'id',
                    ])}, harga sekarang adalah ${lastPrice.toLocaleString(['ban', 'id'])}`,
                  },
                ],
              };
              pushMessageApi(body);
            } else {
              return;
            }
          });
        } catch (error) {
          console.log(error);
          const body = {
            to: userData.line_user_id,
            messages: [
              {
                type: 'text',
                text: 'Terjadi kesalahan pada reminder servis',
              },
            ],
          };
          pushMessageApi(body);
          failed(req, res, 'Error reminder');
        }
      },
      null,
      true,
      'Asia/Bangkok'
    );
  },
  reminderMessageV2() {
    new CronJob(
      '*/3 * * * *',
      async function () {
        try {
          const reminderData = await reminder.findAll({
            include: [
              {
                model: bitcoin,
                attributes: ['bitcoin_code'],
              },
              {
                model: user,
                attributes: ['line_user_id'],
              },
            ],
          });
          reminderData.map(async (data) => {
            const bitcoinResponse = await getCoin(data.bitcoin.bitcoin_code);
            const lastPrice = parseInt(bitcoinResponse.data.ticker.last);
            if (lastPrice <= data.reminder_price && data.active === true) {
              const body = {
                to: data.user.line_user_id,
                messages: [
                  {
                    type: 'text',
                    text: `Harga koin ${
                      data.bitcoin.bitcoin_code
                    } sudah dibawah / sama dengan ${data.reminder_price.toLocaleString([
                      'ban',
                      'id',
                    ])}, harga sekarang adalah ${lastPrice.toLocaleString(['ban', 'id'])}`,
                  },
                ],
              };
              pushMessageApi(body);
            } else {
              return;
            }
          });
        } catch (error) {
          console.log(error);
          const body = {
            to: userData.line_user_id,
            messages: [
              {
                type: 'text',
                text: 'Terjadi kesalahan pada reminder servis',
              },
            ],
          };
          pushMessageApi(body);
          failed(req, res, 'Error reminder');
        }
      },
      null,
      true,
      'Asia/Bangkok'
    );
  },
  // genshinDaily1() {
  //   new CronJob(
  //     '0 */12 * * *',
  //     async function () {
  //       try {
  //         console.log('jalan cron genshin 1', moment());
  //         const data = '{"act_id":"e202102251931481"}';

  //         const config = {
  //           method: 'post',
  //           url: 'https://hk4e-api-os.mihoyo.com/event/sol/sign?lang=en-us',
  //           headers: {
  //             Cookie:
  //               'ltoken=hxy2BW9lstDAEPwSGOWgRY3Mi3c0Wf1wvu3qWnit; ; ltoken=hxy2BW9lstDAEPwSGOWgRY3Mi3c0Wf1wvu3qWnit; ltuid=15341615',
  //             'Content-Type': 'text/plain',
  //           },
  //           data: data,
  //         };

  //         axios(config).then((response) => {
  //           console.log(response);
  //         });
  //       } catch (error) {
  //         console.log(error);
  //         failed(req, res, 'Error checkin');
  //       }
  //     },
  //     null,
  //     true,
  //     'Asia/Bangkok'
  //   );
  // },
};
