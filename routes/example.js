const router = require('express').Router()
const exampleController = require('../controller/example');
const { lineVerifier } = require ('../utils/line')

router.post('/status', lineVerifier, exampleController.checkStatus)
router.post('/generate', exampleController.generateToken)

module.exports = router;
