const user = require('../../server/models').user
const { notFound } = require('../response')

module.exports = {
  async findUser(req, res) {
    const userData = await user.findOne({where: {id: req.params.id}})
    if (!userData) {
      return null
    } else {
      return userData
    }
  }
}