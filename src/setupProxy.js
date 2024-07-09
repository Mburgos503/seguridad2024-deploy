const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://167.172.244.10:8080',
      changeOrigin: true,
      secure: false, 
      pathRewrite: {
        '^/api': '', 
      },
    })
  );
};