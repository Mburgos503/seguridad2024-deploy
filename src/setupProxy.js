const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://167.172.244.10:8080',
      changeOrigin: true,
      secure: false, // para permitir HTTP en lugar de HTTPS
      pathRewrite: {
        '^/api': '', // elimina el prefijo /api cuando hace la solicitud al backend
      },
    })
  );
};