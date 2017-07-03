import mongo from './mongo';
import config from '../../config';
import NewsSchema from './NewsSchema';

const { db } = config;
const primaryData = mongo(db.uri, db.options);

const NewsModel = primaryData.model('news', NewsSchema);

export {
  NewsModel,
};

export default primaryData;
