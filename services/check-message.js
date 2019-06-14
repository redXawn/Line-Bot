const base64 = require('base-64');
const moment = require('moment');
const user = require('../server/models').user;
const bitcoin = require('../server/models').bitcoin
const { findUser } = require('../utils/models/user');
const { pushMessageApi, replyMessageApi } = require('../services/line-services');
const { getCoin } = require('../services/indodax-services')
const { success, notFound, failed } = require('../utils/response');

module.exports = {
  async checkMessageService(req, res, event) {
    const { replyToken, source, message } = event;
    let response
    const lineId = source.userId
    const userData = await findUser('line_user_id', lineId)

    const messageFromUser = message.text.toLowerCase()

    const splitMessage = messageFromUser.split(' ')
    const actionType = splitMessage[0]
    console.log('actionType', actionType)
    if (actionType === 'help' && userData.cookies) {
      const body = {
        to: lineId,
        messages:[
          {
            "type":"text",
            "text": 'Ketik "koin (kode koin)" untuk melihat harga koin'
          },
          {
            "type":"text",
            "text": 'ex koin btc'
          }
        ]
      }
      response = await pushMessageApi(body)
      success(req, res, response.data)
    } else if (actionType === 'help') {
      const body = {
        to: lineId,
        messages:[
          {
            "type":"text",
            "text": 'Ketik "login (password anda)" untuk login'
          },
          {
            "type":"text",
            "text": 'Ketik "resetpassword" untuk mereset password anda'
          }
        ]
      }
      response = await pushMessageApi(body)
      success(req, res, response.data)
    } else if (actionType === 'login') {
      const userCheckPassword = await user.findOne({where: {line_user_id: lineId, password: splitMessage[1]}})
      if (!userCheckPassword) {
        const body = {
          replyToken,
          messages:[
            {
              "type":"text",
              "text": `Maaf password kamu salah?`
            },
            {
              "type":"text",
              "text": `ketik resetpassword, untuk membuat password baru`
            }
          ]
        }
        response = await replyMessageApi(body)
      } else {
        const cookies = base64.encode(lineId + ' ' + moment().format('L'))
        userData.update({
          cookies
        })
        const body = {
          replyToken,
          messages:[
            {
              "type":"text",
              "text": `Hi ${userData.name} kamu berhasil login`
            },
            {
              "type":"text",
              "text": `ketik kode koin yang ingin kamu cek`
            }
          ]
        }
        response = await replyMessageApi(body)
        success(req, res, 'sucess')
      }
    } else if (actionType === 'resetpassword') {
      console.log(' reset asdsadsa')
      const randomPassword = Math.floor(Math.random() * 100000)
      await user.update({
        password: randomPassword
      }, {
        where: {
          line_user_id: lineId
        }
      })
      const body = {
        replyToken,
        messages:[
          {
            "type":"text",
            "text": `Password baru kamu adalah ${randomPassword}`
          }
        ]
      }
      response = await replyMessageApi(body)
      success(req, res, 'sucess')
    } else if (actionType === 'koin' && userData.cookies) {
      const coin = splitMessage[1]
      const bitcoinResponse = await bitcoin.findOne({
        where: { bitcoin_code: coin.toUpperCase() }
      })
      if (!bitcoinResponse) {
        const body = {
          to: lineId,
          messages:[
            {
              "type":"text",
              "text": `Koin yang kamu cari tidak ditemukkan`
            }
          ]
        }
        response = await pushMessageApi(body)
        return notFound(req, res, null)
      } else {
        const bitcoin = await getCoin(bitcoinResponse.bitcoin_code)
        const lastPrice = parseInt(bitcoin.data.ticker.last)
        const body = {
          to: lineId,
          messages:[
            {
              "type":"text",
              "text": `Harga ${bitcoinResponse.bitcoin_name} sekarang adalah Rp${lastPrice.toLocaleString(['ban', 'id'])}`
            }
          ]
        }
        response = await pushMessageApi(body)
        success(req, res, response.data)
      }
    } else if (actionType === 'koin' && !userData.cookies) {
      const body = {
        to: lineId,
        messages:[
          {
            "type":"text",
            "text": "Anda Belum Login, sehingga tidak bisa menggunakan service ini"
          }
        ]
      }
      response = await pushMessageApi(body)
      success(req, res, response.data)
    } else {
      const body = {
        replyToken,
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
      response = await replyMessageApi(body)
      success(req, res, response.data)
    }
  }
}