/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { GraphQLList as List } from 'graphql';
import NewsItemType from '../types/NewsItemType';
import { NewsModel } from '../connect';

const news = {
  type: new List(NewsItemType),
  resolve() {
    return NewsModel.find({});
  },
};

export default news;
