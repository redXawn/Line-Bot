const { replyMessage } = require('../services/reply-message');
const { newUserFollow, userUnfollow } = require('./line-bot');

module.exports = {
  callback(req, res) {
    const event = req.body.events[0]
    switch(event.type){
      case 'message':
        return replyMessage(req, res, event);
        break;
      case 'text':
        return replyMessage(req, res, event);
        break;
      case 'follow':
        return newUserFollow(req, res, event);
        break;
      case 'unfollow':
        return userUnfollow(req, res, event);
        break;
      default:
        return false;
    }
  },
}
