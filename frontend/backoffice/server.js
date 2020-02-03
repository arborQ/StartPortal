const express = require('express');
const path = require('path');
const app = express();
const { PORT: port } = require('./config');


app.use(express.static(path.join(__dirname, 'build')));
app.get('*', function (_, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
