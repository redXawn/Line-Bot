const Crypto = require('crypto');

module.exports.lineVerifier = (req, res, next) => {
  const signature = req.headers['x-line-signature'];
  if ( signature === Crypto.createHmac('sha256', process.env.LINE_CHANNEL_SECRET).digest('base64') ) {
    next()
  } else {
    return res.status(500).send({
      message: 'Not From Line'
    })
  }
};