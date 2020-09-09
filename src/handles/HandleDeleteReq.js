const url = require('url');

const { deleteUser } = require('../controllers/users.js');
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
    const { id } = result;

    const routes = {
      '/users': () => {
        return deleteUser(id);
      }
    }

    if (pathname in routes) {
      res.setHeader('Content-Type', 'application/json;charset=utf-8');
      return res.end(routes[pathname]());
    }

    HandleError(res, 404);
  });
}