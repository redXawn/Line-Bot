const user = require('../server/models').user;
const { success, notFound, failed } = require('../utils/response');
const { findUser, updateUser } = require('../utils/models/user');
const { pushMessageApi, getUserIdApi, replyMessageApi } = require('../services/line-services');

module.exports = {
  async tes (req, res) {
    const allUser = await user.findAll()
    success(req, res, allUser)
  },

  async tes2 (req, res) {
    try {
      res.send({
        data: 'asd'
      })
    } catch(error) {
      failed(req, res, error)
    }
  },

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
      const randomPassword = Math.floor(Math.random() * 100000)
      const responseUserInfo = await getUserIdApi(lineId)
      if (!userData) {
        user.create({
          name: responseUserInfo.data.displayName,
          password: randomPassword,
          line_user_id: lineId,
          follow: true
        })
        const body = {
          to: lineId,
          messages:[
            {
              "type":"text",
              "text": `password anda adalah ${randomPassword}, jangan sampai hilang`
            }
          ]
        }
        const response = await pushMessageApi(body)
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
      const body = {
        follow: false
      }
      updateUser('line_user_id', lineId, body)
      success(req, res, 'success')
    } catch (error) {
      failed(req, res, error)
    }
  }
}