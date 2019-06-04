const router = require('express').Router()
const lineBot = require('../controller/line-bot');

router.get('/status', lineBot.checkStatus)
router.post('/generate', lineBot.generateToken)
router.get('/callback', lineBot.callback)

module.exports = router;
