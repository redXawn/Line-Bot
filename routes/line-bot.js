const router = require('express').Router()
const lineBotController = require('../controller/line-bot');

router.post('/message/:id', lineBotController.pushMessage)
router.get('/user/:id', lineBotController.getUserId)
router.get('/user/all', lineBotController.tes)
router.get('/user/tes', lineBotController.tes2)

module.exports = router;
