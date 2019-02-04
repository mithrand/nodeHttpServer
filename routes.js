const fs = require('fs');
const path = require('path');
const config = require('./config');
const httpStatus = require('http-status-codes');

const notFound = (req, res) => {
  res.statusCode = httpStatus.NOT_FOUND;
  return res.end();
}

const notImplemented = (req, res) => {
  res.statusCode = httpStatus.NOT_IMPLEMENTED;
  return res.end();
}

const loadRoutes = () => {
  const controllersPath = config.controllersPaths.map(controllerPath => path.join(__dirname, controllerPath));
  const files = controllersPath.reduce((files, dir) => files.concat(fs.readdirSync(dir).map(file => path.join(dir, file))), []);
  const routes = files.map(file => {
    const fileName = path.basename(file,'.js').toLowerCase();
    return {
      url: fileName === 'main' ? '/' : `/${fileName}`,
      controller: file,
    };
  });
  return routes;
};

const routes = loadRoutes();

const routesHandler = (req, res) => {
  try{
    const url = req.url;
    const method = req.method.toLowerCase();
    const route = routes.find( route => route.url === url);
    if( !route ) {
      return notFound(req, res);
    }
    const controller = require(route.controller);
    const endpoint = controller[method];
    if( !endpoint ) {
      return notImplemented(req, res);
    }
    return endpoint(req,res);
  }
  catch(error) {
    console.error(error)
    res.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    res.end();
  }

}


module.exports = routesHandler;