import { all, take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from '../../actions/router';
import {
  LOAD_PAGE,
} from './constants';
import {
  loadPageSuccess,
  // repoLoadingError,
} from './actions';

// import { getHelpers } from '../../store/configureStore';
import fetch from '../../utils/fetch';

// import { makeSelectUsername } from './selectors';

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
  const [fetchPage] = yield all([
    takeLatest(LOAD_PAGE, getPage),
  ]);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(fetchPage);
}

// Bootstrap sagas
export default [
  githubData,
];
