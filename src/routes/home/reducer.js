import { fromJS } from 'immutable';

import {
  // CHANGE_USERNAME,
  CHANGE_USERNAME_SUCCESS,
  LOAD_PAGE_SUCCESS,
  LOAD_PAGE,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  username: '',
  list: [],
  pageInfo: {
    currentPage: 1,
  },
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    /**
    case CHANGE_USERNAME:

      // Delete prefixed '@' from the github username
      return state
        .set('username', action.name.replace(/@/gi, ''));
    */
    case CHANGE_USERNAME_SUCCESS:

      // Delete prefixed '@' from the github username
      return state
        .set('username', action.name.username.replace(/@/gi, ''));

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
