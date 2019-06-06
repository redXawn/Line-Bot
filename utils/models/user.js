const user = require('../../server/models').user
const { notFound } = require('../response')

module.exports = {
  async findUser(params, id) {
    const userData = await user.findOne({where: {[params]: id}})
    if (!userData) {
      return null
    } else {
      return userData
    }
  },

  async updateUser(params, id, form) {
    const userData = await user.update(form, {where: {[params]: id}})
    return userData
  }
}