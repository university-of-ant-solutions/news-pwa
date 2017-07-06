import { all, take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from '../../actions/router';
import {
  LOAD_NEW,
} from './constants';
import {
  loadNewSuccess,
} from './actions';
import fetch from '../../utils/fetch';

let apiUrl = 'https://news-pwa.particle4dev.com';

if (__DEV__) {
  apiUrl = 'http://localhost:3000';
}
export function* getNew({ id }) {
  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(fetch, `${apiUrl}/api/v1/news/${id}`);
    yield put(loadNewSuccess(repos));
  } catch (err) {
    console.log(err);
    // yield put(repoLoadingError(err));
  }
}

export function* watchNewPage() {
  const [fetchNew] = yield all([
    takeLatest(LOAD_NEW, getNew),
  ]);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(fetchNew);
}

// Bootstrap sagas
export default [
  watchNewPage,
];
