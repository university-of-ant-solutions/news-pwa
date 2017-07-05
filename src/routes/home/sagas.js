import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from '../../actions/router';
import { CHANGE_USERNAME } from './constants';
import {
  changeUsernameSuccess,
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
    console.log(process.env.BROWSER, 'before');
    const repos = yield call(fetch, 'http://localhost:3000/api/v1/username');
    yield put(changeUsernameSuccess(repos));
    console.log(process.env.BROWSER, repos);

  } catch (err) {
    console.log(err);
  //   yield put(repoLoadingError(err));
  }
}

export function* githubData() {
  const watcher = yield takeLatest(CHANGE_USERNAME, getRepos);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  githubData,
];
