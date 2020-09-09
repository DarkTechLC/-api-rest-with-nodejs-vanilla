const http = require('http');

module.exports = (res, errorCode) => {
  res.statusCode = errorCode;
  return res.end(JSON.stringify({
    error: true,
    message: http.STATUS_CODES[errorCode]
  }));
}