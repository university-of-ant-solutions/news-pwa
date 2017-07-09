import { all, take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from '../../actions/router';
import {
  LOAD_NEW,
} from './constants';
import {
  loadNewSuccess,
} from './actions';

export function* getNew({ fetch }, { id }) {
  try {
    process.env.BROWSER && NProgress.start();
    // Call our request helper (see 'utils/request')
    const repos = yield call(fetch, `/api/v1/news/${id}`);
    yield put(loadNewSuccess(repos));
  } catch (err) {
    console.log(err);
    // yield put(repoLoadingError(err));
  }
  process.env.BROWSER && NProgress.done();
}

export function* watchNewPage(context) {
  const [fetchNew] = yield all([
    takeLatest(LOAD_NEW, getNew, context),
  ]);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(fetchNew);
}

// Bootstrap sagas
export default [
  watchNewPage,
];
