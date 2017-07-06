// import createError from 'http-errors';
import { NewsModel, Service } from '../../connect';
import { APIRouter } from '../../../utils/rest';
import {
  PAGING_DEFAULT,
  PAGING_MAX,
} from '../../../constants';

const wrap = fn => (...args) => fn(...args).catch(args[2]);

const newsService = Service({
  Model: NewsModel,
  paginate: {
    default: PAGING_DEFAULT,
    max: PAGING_MAX,
  },
});

export default class NewsRouter extends APIRouter {

  mountRoutes() {

    this.route('GET', '/check', [], wrap(async ({ params }, res) => {
      res.status(200).json({
        status: 'ok',
      });
    }));

    this.route('GET', '/news/:id', [], wrap(async ({ params }, res) => {
      res.status(200).json(await NewsModel.findOne({ _id: params.id }));
    }));

    this.route('GET', '/news', [], wrap(async ({ query }, res) => {
      res.status(200).json(await newsService.find({
        query: {
          $skip: (parseInt(query.page, 10) - 1) * PAGING_DEFAULT,
          $sort: {
            pubDate: -1,
          },
        },
      }));
    }));
  }
}
