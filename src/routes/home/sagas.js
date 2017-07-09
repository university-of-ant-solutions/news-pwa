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

// both only
export function* getPage({ fetch }, { page }) {
  try {
    // Call our request helper (see 'utils/request')
    process.env.BROWSER && NProgress.start();
    const repos = yield call(fetch, `/api/v1/news?page=${page}`);
    yield put(loadPageSuccess(repos.data, repos.paging));
  } catch (err) {
    console.log(err);
    // yield put(repoLoadingError(err));
  }
  process.env.BROWSER && NProgress.done();
}

export function* githubData(context) {
  // client only
  const [fetchPage] = yield all([
    takeLatest(LOAD_PAGE, getPage, context),
  ]);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(fetchPage);
}

// Bootstrap sagas
export default [
  githubData,
];
