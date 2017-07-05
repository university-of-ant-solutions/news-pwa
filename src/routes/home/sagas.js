import { all, take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from '../../actions/router';
import {
  CHANGE_USERNAME,
  LOAD_PAGE,
} from './constants';
import {
  changeUsernameSuccess,
  loadPageSuccess,
  // repoLoadingError,
} from './actions';

// import { getHelpers } from '../../store/configureStore';
import fetch from '../../utils/fetch';

// import { makeSelectUsername } from './selectors';

export function* getRepos() {
  // Select username from store
  // const username = yield select(makeSelectUsername());
  // const { fetch } = getHelpers();
  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(fetch, 'http://localhost:3000/api/v1/username');
    yield put(changeUsernameSuccess(repos));
  } catch (err) {
    console.log(err);
    // yield put(repoLoadingError(err));
  }
}

export function* getPage({ page }) {
  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(fetch, `http://localhost:3000/api/v1/news?page=${page}`);
    yield put(loadPageSuccess(repos.data, repos.paging));
  } catch (err) {
    console.log(err);
    // yield put(repoLoadingError(err));
  }
}

export function* githubData() {
  const [fetchUsername, fetchPage] = yield all([
    takeLatest(CHANGE_USERNAME, getRepos),
    takeLatest(LOAD_PAGE, getPage),
  ]);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(fetchUsername);
  yield cancel(fetchPage);
}

// Bootstrap sagas
export default [
  githubData,
];
