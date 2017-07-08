// import createError from 'http-errors';
// import random from 'lodash/random';
import { NewsModel, Service } from '../../connect';
import { APIRouter } from '../../../utils/rest';
import {
  PAGING_DEFAULT,
  PAGING_MAX,
} from '../../../constants';

// import data from './data.json';
/**
(async () => {
  try {
    const { data: { news } } = data;
    for (let i = news.length - 1; i >= 0; i--) {
      let t = await NewsModel.findOne({ guid: news[i].guid });
      if (!t) {
        await NewsModel.create(news[i]);
        console.log(`done: ${news[i].guid}`);
      }
    }

    const c = await NewsModel.find({});
    for (let y = c.length - 1; y >= 0; y--) {
      let t = await NewsModel.findOne({ guid: c[y].guid });
      if (t) {
        await NewsModel.update({
          _id: t._id,
        },
        {$set: {
          point: random(0, 100),
        }});
      }
    }
  } catch (e) {
    console.log(e);
  }
})();
*/
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
