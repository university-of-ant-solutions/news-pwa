import logger from '../../data/logger';

const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';
const METHODS = [GET, POST, PUT, DELETE];

function methodValidator(v) {
  return !!~METHODS.indexOf(v);
}

export default class Router {

  constructor() {
    this._routers = [];
    this._path = '';
    this._versions = '';
    this.mountRoutes();
  }

  mountRoutes() {
    // FIXEDME: write a warning log
    logger.warn('not implement yet');
  }

  route(method, path, middlewares, hander) {
    if (typeof middlewares === 'function') {
      hander = middlewares;
      middlewares = [];
    }

    if (!methodValidator(method)) {
      throw new Error(`we currently do not support ${method} method`);
    }

    this._routers.push({
      method,
      path,
      middlewares,
      hander,
    });
  }

  _getPath() {
    if (this._path.length === 0 && this._versions.length === 0) {
      return '';
    }
    if (this._path.length !== 0) {
      return '/' + this._path + '/' + this._versions;
    }
    return '/' + this._versions;
  }

  mountToExpress(app) {
    for (let route of this._routers) {
      switch (route.method) {
        case GET:
          app.get(this._getPath() + route.path, route.middlewares, route.hander);
          break;
        case POST:
          app.post(this._getPath() + route.path, route.middlewares, route.hander);
          break;
        case PUT:
          app.put(this._getPath() + route.path, route.middlewares, route.hander);
          break;
        case DELETE:
          app.delete(this._getPath() + route.path, route.middlewares, route.hander);
          break;
        default:
          throw new Error('unexpected method');
      }
    }
  }
}
