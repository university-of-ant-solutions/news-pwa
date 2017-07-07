import { fromJS } from 'immutable';

import {
  LOAD_NEW_SUCCESS,
  LOAD_NEW,
  CLEAR_DATA,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  id: null,
  data: null,
});

function newReducer(state = initialState, action) {
  switch (action.type) {

    case LOAD_NEW:
      return state
        .set('id', action.id);

    case LOAD_NEW_SUCCESS:
      return state
        .set('data', fromJS(action.data));

    case CLEAR_DATA:
      return initialState;

    default:
      return state;
  }
}

export default newReducer;
