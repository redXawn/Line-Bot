
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const CronJob = require('cron').CronJob;
require('dotenv').config()

const app = express();

const lineRoute = require('./routes/line-bot')
const callbackRoute = require('./routes/callback')

app.use(logger('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/line', lineRoute)
app.use('/callback', callbackRoute)

app.get('/', (req, res) => res.status(200).send({
  message: 'Line Bot Example',
}));

// const { success, notFound, failed } = require('./utils/response');
// const { findUser } = require('./utils/models/user');
// const { pushMessageApi } = require('./services/line-services');

// new CronJob('*/2 * * * *', async function(req, res) {
//   try {
//     console.log('send hi')
//     const userData = await findUser('id', 1)
//     if (!userData) {
//       return notFound(req, res, null)
//     }
//     const body = {
//       to: userData.line_user_id,
//       messages:[
//         {
//           "type":"text",
//           "text": "Hi"
//         }
//       ]
//     }
//     const response = await pushMessageApi(body)
//     console.log('response', response.config.data)
//     // res.send({message: 'ok'})
//     // success(req, res, response.config.data)
//   } catch(error) {
//     failed(req, res, error)
//   }
// }, null, true, 'Asia/Bangkok')

// new CronJob('*/2 * * * *', function() {
//   console.log('tes cron')
// }, null, true, 'Asia/Bangkok')

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

app.use(function(req, res, next) {
  res.status(404).send({message: 'API Not Found'})
});

module.exports = app;
