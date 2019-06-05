const router = require('express').Router()
const callbackController = require('../controller/callback');

router.post('/check', callbackController.callback)

module.exports = router;
