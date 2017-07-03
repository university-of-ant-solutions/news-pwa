import Router from './Router';

export default class APIRouter extends Router {
  constructor() {
    super();
    this._path = 'api';
    this._versions = 'v1';
  }
}
