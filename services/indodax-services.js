const { axiosHelper } = require('../utils/api');
module.exports = {
  getCoin(coin) {
    return axiosHelper('GET', `https://indodax.com/api/${coin.toLowerCase()}_idr/ticker`)
  }
}