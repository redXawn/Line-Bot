const user = require('../server/models').user
const { axiosHelper } = require('../utils/api');
const { success, notFound, failed } = require('../utils/response')
const { findUser, updateUser } = require('../utils/models/user')
const { pushMessageApi, getUserIdApi, replyMessageApi } = require('../services/line-services')

module.exports = {
  async getUserId(req, res) {
    try {
      const userData = await findUser('id', req.params.id)
      if (!userData) {
        return notFound(req, res, null)
      }
      const response = await getUserIdApi(userData.line_user_id)
      success(req, res, response.data)
    } catch (error) {
      failed(req, res, error)
    }
  },

  async pushMessage(req, res) {
    try {
      const userData = await findUser('id', req.params.id)
      if (!userData) {
        return notFound(req, res, null)
      }
      const body = {
        to: userData.line_user_id,
        messages:[
          {
            "type":"text",
            "text": req.body.text
          }
        ]
      }
      const response = await pushMessageApi(body)
      success(req, res, response.config.data)
    } catch(error) {
      failed(req, res, error)
    }
  },

  async newUserFollow(req, res, event) {
    try {
      const lineId = event.source.userId
      const userData = await findUser('line_user_id', lineId)
      const responseUserInfo = await getUserIdApi(lineId)
      if (!userData) {
        user.create({
          name: responseUserInfo.data.displayName,
          line_user_id: lineId,
          follow: true
        })
      } else {
        userData.update({
          follow: true
        })
      }
      success(req, res, 'success')
    } catch (error) {
      failed(req, res, error)
    }
  },

  userUnfollow(req, res, event) {
    try {
      const lineId = event.source.userId
      user.update(
        {follow: false},
        {
          where: {
          line_user_id: lineId
        }
      })
      success(req, res, 'success')
    } catch (error) {
      failed(req, res, error)
    }
  },

  async replyMessage(req, res, event) {
    try {
      const lineId = event.source.userId
      const messageFromUser = event.message.text.toLowerCase()
      if (messageFromUser === 'help') {
        const body = {
          to: lineId,
          messages:[
            {
              "type":"text",
              "text": 'apa yang bisa dibantu ?'
            }
          ]
        }
        const response = await pushMessageApi(body)
        success(req, res, response.data)
      } else {
        console.log('masuk else')
        const userData = await findUser('line_user_id', lineId)
        const body = {
          replyToken: event.replyToken,
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

  // replyMessage(req, res, event) {
  //   const lineId = event.source.userId
  //   return user.findOne({
  //     where: {
  //       line_user_id: lineId
  //     }
  //   })
  //   .then(dataUser => {
  //     console.log('asd', lineId)
  //     if (!dataUser.name) {
  //       console.log('yey')
  //       const body = {
  //         replyToken: '2fdb4e796b4747ec83c552a1f5c1c240',
  //         messages:[
  //           {
  //             "type":"text",
  //             "text": "Silahkan Masukkan Nama Kamu"
  //           }
  //         ]
  //       }
  //       axiosHelper('POST', 'https://api.line.me/v2/bot/message/reply', JSON.stringify(body))
  //       .then(response => {
  //         console.log('adsadas', response)
  //         success(req, res, 'success')
  //       })
  //       .catch(err => {
  //         console.log('err asd', err)
  //         failed(req, res, error)
  //       })
  //     } else {
  //       console.log('abc')
  //     }
  //   })
  //   .catch(error => {
  //     console.log('error', error)
  //     failed(req, res, error)
  //   })
  // }
}