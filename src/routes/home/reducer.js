import { fromJS } from 'immutable';

import {
  // CHANGE_USERNAME,
  CHANGE_USERNAME_SUCCESS,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  username: '',
  list: {},
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

    default:
      return state;
  }
}

export default homeReducer;
