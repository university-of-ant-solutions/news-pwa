import {
  CHANGE_USERNAME,
  CHANGE_USERNAME_SUCCESS,
  // CHANGE_USERNAME_ERROR,
  LOAD_PAGE,
  LOAD_PAGE_SUCCESS,
} from './constants';

export function changeUsername(name) {
  return {
    type: CHANGE_USERNAME,
    name,
  };
}

export function changeUsernameSuccess(name) {
  return {
    type: CHANGE_USERNAME_SUCCESS,
    name,
  };
}

export function loadPage(page) {
  return {
    type: LOAD_PAGE,
    page,
  };
}

export function loadPageSuccess(data) {
  return {
    type: LOAD_PAGE_SUCCESS,
    data,
  };
}

// export function changeUsernameError(name) {
//   return {
//     type: CHANGE_USERNAME_SUCCESS,
//     name,
//   };
// }
