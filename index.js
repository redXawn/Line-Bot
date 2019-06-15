
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const CronJob = require('cron').CronJob;
require('dotenv').config()

const app = express();

const lineRoute = require('./routes/line-bot')
const callbackRoute = require('./routes/callback')
const reminderCron = require('./services/cron/reminder')
const logoutCron = require('./services/cron/logout')

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

reminderCron.reminderMessage()
logoutCron.logoutUser()

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

app.use(function(req, res, next) {
  res.status(404).send({message: 'API Not Found'})
});

module.exports = app;
