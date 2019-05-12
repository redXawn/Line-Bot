const router = require('express').Router()
const line = require('@line/bot-sdk');
const lineBot = require('../controller/line-bot');
const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};

router.get('/status',line.middleware(config), lineBot.checkStatus)

module.exports = router;
