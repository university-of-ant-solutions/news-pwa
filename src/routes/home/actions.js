import {
  LOAD_PAGE,
  LOAD_PAGE_SUCCESS,
} from './constants';

export function loadPage(page) {
  return {
    type: LOAD_PAGE,
    page,
  };
}

export function loadPageSuccess(data, paging) {
  return {
    type: LOAD_PAGE_SUCCESS,
    data,
    paging,
  };
}

// export function changeUsernameError(name) {
//   return {
//     type: CHANGE_USERNAME_SUCCESS,
//     name,
//   };
// }
