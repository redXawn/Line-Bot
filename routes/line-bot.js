const router = require('express').Router()
const lineBot = require('../controller/line-bot');

router.get('/callback', lineBot.callback)

module.exports = router;
