module.exports = {
  checkStatus(req, res) {
    console.log('asd', process.env.CHANNEL_ACCESS_TOKEN)
    res.send('ok')
  },

  generateToken(req, res) {
    console.log('req', req.body.events)
    const body = {
      grant_type: 'authorization_code',
      
    }
    axios.post('post', 'https://api.line.me/oauth2/v2.1/token', )
  },
}