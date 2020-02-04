const express = require('express');
const path = require('path');
var proxyMiddleware = require('http-proxy-middleware');
const app = express();
const { PORT: port, PROXY_ACCOUNT } = require('./config');

app.use(proxyMiddleware(PROXY_ACCOUNT));

app.use(express.static(path.join(__dirname, 'build')));
app.get('*', function (_, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
