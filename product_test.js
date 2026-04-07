const http = require('http');

const request = (options) =>
  new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.end();
  });

(async () => {
  try {
    const detail = await request({ host: 'localhost', port: 5000, path: '/api/products/69d4a650b215f76f1d9408db', method: 'GET' });
    console.log('DETAIL', detail.status, detail.body.slice(0, 300));
    const filtered = await request({ host: 'localhost', port: 5000, path: '/api/products?category=Casual&sort=price_desc&page=1&limit=5', method: 'GET' });
    console.log('FILTERED', filtered.status, filtered.body.slice(0, 300));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
