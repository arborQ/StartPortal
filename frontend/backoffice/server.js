const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;
const api = require('./api');

app.use(express.static(path.join(__dirname, 'build')));

app.use('/api', api);

app.get('/', function (_, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
