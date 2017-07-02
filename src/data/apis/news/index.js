// import createError from 'http-errors';
import { NewsModel } from '../../connect';
import { APIRouter } from '../../../utils/rest';

const wrap = fn => (...args) => fn(...args).catch(args[2]);

export default class NewsRouter extends APIRouter {

  mountRoutes() {
    this.route('GET', '/news', [], wrap(async (req, res, next) => res.status(200).json({
      news: await NewsModel.find({}),
    })));
  }
}
