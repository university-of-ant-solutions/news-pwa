import {
  LOAD_NEW,
  LOAD_NEW_SUCCESS,
  CLEAR_DATA,
} from './constants';

export function loadNew(id) {
  return {
    type: LOAD_NEW,
    id,
  };
}

export function loadNewSuccess(data) {
  return {
    type: LOAD_NEW_SUCCESS,
    data,
  };
}

export function clearData() {
  return {
    type: CLEAR_DATA,
  };
}
