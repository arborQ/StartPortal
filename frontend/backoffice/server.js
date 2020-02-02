const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const api = require('./api');
const { PORT: port } = require('./config');

app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.json());
app.use('/api', api);

app.get('/', function (_, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
