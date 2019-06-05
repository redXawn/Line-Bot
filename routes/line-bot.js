const router = require('express').Router()
const lineBotController = require('../controller/line-bot');

router.post('/message', lineBotController.pushMessage)

module.exports = router;
