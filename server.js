const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

const indexFile = path.join(__dirname, 'public', 'index.html');
const port = Number(process.env.PORT) || 10000;

const server = http.createServer((request, response) => {
  const method = request.method || 'GET';
  const pathname = new URL(request.url || '/', 'http://localhost').pathname;

  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.setHeader('X-Frame-Options', 'DENY');

  if (method !== 'GET' && method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    response.end('Method Not Allowed');
    return;
  }

  if (pathname !== '/' && pathname !== '/index.html') {
    response.writeHead(404);
    response.end('Not Found');
    return;
  }

  fs.readFile(indexFile, (error, content) => {
    if (error) {
      response.writeHead(503);
      response.end('Site is not built yet');
      return;
    }

    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Length': content.length,
    });
    response.end(method === 'HEAD' ? undefined : content);
  });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`4G Beverages site listening on port ${port}`);
});
