const user = require('../server/models').user
const { axiosHelper } = require('../utils/api');
const { success, notFound, failed } = require('../utils/response')
const { pushMessageApi, getUserIdApi } = require('../services/line-services')

module.exports = {
  async getUserId(req, res) {
    try {
      const userData = await user.findOne({where: {id: req.params.id}})
      if (!userData) {
        return notFound(req, res, userData)
      }
      const response = await getUserIdApi(userData.line_user_id)
      success(req, res, response.data)
    } catch (error) {
      failed(req, res, error)
    }
  },

  async pushMessage(req, res) {
    try {
      const userData = await user.findOne({where: {id: req.body.userId}})
      if (!userData) {
        return notFound(req, res, userData)
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

  // newUserFollow(req, res, event) {
  //   const lineId = event.source.userId
  //   return user.findOne({
  //     where: {
  //       line_user_id: lineId
  //     }
  //   })
  //   .then(dataUser => {
  //     if (!dataUser) {
  //       user.create({
  //         line_user_id: lineId,
  //         follow: true
  //       })
  //     } else {
  //       dataUser.update({
  //         follow: true
  //       })
  //     }
  //     success(req, res, 'success')
  //   })
  // },

  // userUnfollow(req, res, event) {
  //   const lineId = event.source.userId
  //   user.update(
  //     {
  //       follow: false
  //     },
  //     {
  //     where: {
  //       line_user_id: lineId
  //     }
  //   })
  //   success(req, res, 'success')
  // },

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