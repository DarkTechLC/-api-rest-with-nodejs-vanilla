const url = require('url');

const { createUser } = require('../controllers/users.js');
const HandleError = require('./HandleError.js');

function collectBodyData(request, cb) {
  let rawData = '';

  request
    .on('data', chunk => {
      rawData += chunk.toString();
    }).on('end', () => {
      cb(JSON.parse(rawData));
    });
}

module.exports = (req, res) => {
  const { pathname } = url.parse(req.url);

  collectBodyData(req, result => {
    const { name, email } = result;

    const routes = {
      '/users': () => {
        return createUser(name, email);
      }
    }

    if (pathname in routes) {
      res.setHeader('Content-Type', 'application/json;charset=utf-8');
      return res.end(routes[pathname]());
    }

    HandleError(res, 404);
  });
}