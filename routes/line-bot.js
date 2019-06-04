const router = require('express').Router()
const lineBot = require('../controller/line-bot');

router.get('/status', lineBot.checkStatus)
router.post('/generate', lineBot.generateToken)

module.exports = router;
