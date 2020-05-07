const proxy = require('http-proxy-middleware');
const { PROXY_ACCOUNT } = require('../config');

console.log({ proxy });

module.exports = function(app) {
  app.use(
    '/api',
    proxy.createProxyMiddleware({
      target: PROXY_ACCOUNT,
      changeOrigin: true,
    })
  );
};