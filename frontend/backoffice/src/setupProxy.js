const proxy = require('http-proxy-middleware');
const { PROXY_ACCOUNT } = require('../config');

module.exports = function(app) {
  app.use(
    '/api',
    proxy({
      target: PROXY_ACCOUNT,
      changeOrigin: true,
    })
  );
};