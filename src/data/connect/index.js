import mongo from './mongo';
import config from '../../config';
import NewsSchema from './NewsSchema';
import Service from './paging/service';

const { db } = config;
const primaryData = mongo(db.uri, db.options);

const NewsModel = primaryData.model('news', NewsSchema);

export {
  NewsModel,
  Service,
};

export default primaryData;
