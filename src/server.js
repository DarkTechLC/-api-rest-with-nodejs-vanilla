const http = require('http');

const HandleGetReq = require('./handles/HandleGetReq.js');
const HandlePostReq = require('./handles/HandlePostReq.js');
const HandlePutReq = require('./handles/HandlePutReq.js');
const HandleDeleteReq = require('./handles/HandleDeleteReq.js');

const PORT = process.env.PORT || 3333;

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    console.log('==> New request, method: GET');
    return HandleGetReq(req, res);
  } else if (req.method === 'POST') {
    console.log('==> New request, method: POST');
    return HandlePostReq(req, res);
  } else if (req.method === 'PUT') {
    console.log('==> New request, method: PUT');
    return HandlePutReq(req, res);
  } else if (req.method === 'DELETE') {
    console.log('==> New request, method: DELETE');
    return HandleDeleteReq(req, res);
  } else {
    console.log('==> New request, method not allowed');
    return res.end(JSON.stringify({
      error: true,
      message: http.STATUS_CODES[405]
    }, null, 2));
  }
});

server.listen(PORT, () => {
  console.log(`Server running in port ${PORT}...`);
});
