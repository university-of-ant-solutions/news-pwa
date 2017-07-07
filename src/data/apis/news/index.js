// import createError from 'http-errors';
import { NewsModel, Service } from '../../connect';
import { APIRouter } from '../../../utils/rest';
import {
  PAGING_DEFAULT,
  PAGING_MAX,
} from '../../../constants';

import data from './data.json';

(async () => {
  try {
    const { data: { news } } = data;
    for (var i = news.length - 1; i >= 0; i--) {
      let t = await NewsModel.findOne({ guid: news[i].guid });
      if (!t) {
        await NewsModel.create(news[i]);
        console.log(`done: ${news[i].guid}`);
      }
    }
  } catch (e) {
    console.log(e);
  }
//   const buildingId = '58da279f0ff5af8c8be59c36';
//   let user = '58f9c1bf2d4581000484b188';
//   let t = await BuildingMembersModel.findOne({ building: buildingId, user });
//   if (!t) {
//     await BuildingMembersModel.create({
//       building: buildingId,
//       user,
//       type: ADMIN,
//       status: ACCEPTED,
//     });
//   }
//   user = '59034c6c60f3c7beab57220a';
//   await BuildingMembersModel.remove({ building: buildingId, user });
//   t = await BuildingMembersModel.findOne({ building: buildingId, user });
//   if (!t) {
//     await BuildingMembersModel.create({
//       building: buildingId,
//       user,
//       type: MEMBER,
//       status: PENDING,
//     });
//   }
})();

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
