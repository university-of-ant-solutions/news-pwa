import { fromJS } from 'immutable';

import {
  LOAD_PAGE_SUCCESS,
  LOAD_PAGE,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  list: [],
  pageInfo: {
    currentPage: 1,
    total: 1,
    limit: 0,
    skip: 0,
  },
});

function homeReducer(state = initialState, action) {
  switch (action.type) {

    case LOAD_PAGE:
      return state
        .setIn(['pageInfo', 'currentPage'], action.page);

    case LOAD_PAGE_SUCCESS:
      return state
        .set('pageInfo', state.get('pageInfo').merge({
          ...action.paging,
        }))
        .set('list', fromJS(action.data));

    default:
      return state;
  }
}

export default homeReducer;
