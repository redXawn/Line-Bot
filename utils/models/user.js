const user = require('../../server/models').user
const { notFound } = require('../response')

module.exports = {
  async findUser(params, id) {
    try {
      const userData = await user.findOne({where: {[params]: id}})
      if (!userData) {
        return null
      } else {
        return userData
      }
    } catch (error) {
      return null
    }
  },

  async updateUser(params, id, form) {
    try {
      const userData = await user.update(form, {where: {[params]: id}})
      return userData
    } catch (error) {
      return null
    }
  }
}