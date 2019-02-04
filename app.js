const http = require('http');
const router = require('./routes');
const dataService = require('./services/dataService');

dataService
  .start()
  .then(() => {
    const server = http.createServer(router);
    server.listen(3000);
  })
  .catch(error => console.error(error));
