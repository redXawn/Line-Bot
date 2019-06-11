const router = require('express').Router()
const lineBotController = require('../controller/line-bot');

router.post('/message/:id', lineBotController.pushMessage)
router.get('/user/:id', lineBotController.getUserId)
router.get('/userAll', lineBotController.tes)
router.get('/tes1', lineBotController.tes2)

module.exports = router;
