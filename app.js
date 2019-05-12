const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
app.get('/', function (req, res) {
  res.send({message: 'Welcome'});
});
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

module.exports = app