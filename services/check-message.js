const base64 = require('base-64');
const moment = require('moment');
const user = require('../server/models').user;
const bitcoin = require('../server/models').bitcoin
const reminder = require('../server/models').reminder
const { findUser } = require('../utils/models/user');
const { pushMessageApi, replyMessageApi } = require('../services/line-services');
const { getCoin } = require('../services/indodax-services')
const { success, notFound, failed } = require('../utils/response');

module.exports = {
  async checkMessageService(req, res, event) {
    try {
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
              "text": 'Ketik "koin (kode koin)" untuk melihat harga koin. Ex: koin btc'
            },
            {
              "type":"text",
              "text": 'Ketik "reminder (kode koin) (harga saat ingin diberi notifikasi). Ex: reminder btc 100000000'
            }
          ]
        }
        response = await pushMessageApi(body)
        success(req, res, response.data)
      } else if (actionType === 'help' && !userData.cookies) {
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
      } else if (actionType === 'resetpassword' && userData.cookies) {
        const body = {
          replyToken,
          messages:[
            {
              "type":"text",
              "text": `Hai ${userData.name}, id kamu masih login`
            }
          ]
        }
        response = await replyMessageApi(body)
        success(req, res, 'sucess')
      } else if (actionType === 'resetpassword' && !userData.cookies) {
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
      } else if (actionType === 'reminder' && userData.cookies && splitMessage[1].toLowerCase() === 'off') {
        const reminderUser = await reminder.findOne({where: {user_id: userData.id}})
        if (!reminderUser) {
          const body = {
            to: lineId,
            messages:[
              {
                "type":"text",
                "text": "Anda belum mengaktifkan servis notifikasi"
              }
            ]
          }
          response = await pushMessageApi(body)
          return notFound(req, res, null)
        } else {
          reminderUser.update({
            active: false
          })
          const body = {
            to: lineId,
            messages:[
              {
                "type":"text",
                "text": "Servis notifikasi berhasil dimatikan"
              }
            ]
          }
          response = await pushMessageApi(body)
          success(req, res, response.data)
        }
      } else if (actionType === 'reminder' && userData.cookies) {
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
          const reminderUser = await reminder.findOne({where: {user_id: userData.id}})
          const price = parseInt(splitMessage[2])
          const bitcoin = await getCoin(bitcoinResponse.bitcoin_code)
          const lastPrice = parseInt(bitcoin.data.ticker.last)
          if (!reminderUser) {
            reminder.create({
              user_id: userData.id,
              bitcoin_id: bitcoinResponse.id,
              last_price: lastPrice,
              reminder_price: price,
              active: true
            })
            const body = {
              to: lineId,
              messages:[
                {
                  "type":"text",
                  "text": `Anda akan diberi notifikasi saat harga ${bitcoinResponse.bitcoin_name} <= Rp${price.toLocaleString(['ban', 'id'])}, harga saat ini adalah Rp${lastPrice.toLocaleString(['ban', 'id'])}`
                },
                {
                  "type":"text",
                  "text": "Ketik reminder off untuk mematikan servis notifikasi"
                }
              ]
            }
            response = await pushMessageApi(body)
            success(req, res, response.data)
          } else {
            reminderUser.update({
              bitcoin_id: bitcoinResponse.id,
              last_price: lastPrice,
              reminder_price: price,
              active: true
            })
            const body = {
              to: lineId,
              messages:[
                {
                  "type":"text",
                  "text": `Anda akan diberi notifikasi saat harga ${bitcoinResponse.bitcoin_name} <= Rp${price.toLocaleString(['ban', 'id'])}, harga saat ini adalah Rp${lastPrice.toLocaleString(['ban', 'id'])}`
                },
                {
                  "type":"text",
                  "text": 'Ketik "reminder off" untuk mematikan servis notifikasi'
                }
              ]
            }
            response = await pushMessageApi(body)
            success(req, res, response.data)
          }
        }
      } else if (actionType === 'reminder' && !userData.cookies) {
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
    } catch (error ) {
      console.error('error reply message ==>', error)
      const body = {
        replyToken,
        messages:[
          {
            "type":"text",
            "text": `Terjadi Kesalahan, maafkan kami`
          }
        ]
      }
      response = await replyMessageApi(body)
      failed(req, res, 'error reply message')
    }
  }
}