const router = require('express').Router()
const example = require('../controller/example');

router.get('/status', example.checkStatus)
router.post('/generate', example.generateToken)

module.exports = router;
