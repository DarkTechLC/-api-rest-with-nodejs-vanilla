const url = require('url');

const { getUsers } = require('../controllers/users.js');
const HandleError = require('./HandleError.js');

module.exports = (req, res) => {
  const { pathname } = url.parse(req.url);

  const routes = {
    '/users': () => {
      res.statusCode = 200;
      return getUsers();
    }
  }

  if (pathname in routes) {
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    return res.end(routes[pathname]());
  }

  HandleError(res, 404);
}