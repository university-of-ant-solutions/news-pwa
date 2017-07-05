import { combineReducers } from 'redux-immutable';
import runtime from './runtime';
import user from './user';
import router from './router';

export default function createReducer(asyncReducers) {
  return combineReducers({
    runtime,
    user,
    router,
    ...asyncReducers,
  });
}
