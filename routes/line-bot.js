const router = require('express').Router()
const lineBotController = require('../controller/line-bot');

router.post('/message', lineBotController.pushMessage)
router.get('/user/:id', lineBotController.getUserId)

module.exports = router;
