import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import createReducer from '../reducers';
import createHelpers from './createHelpers';
import createLogger from './logger';

const sagaMiddleware = createSagaMiddleware();

let store = null;
let helpers = null;

export function getStore() {
  return store;
}

export function getHelpers() {
  return helpers;
}

export default function configureStore(initialState = {}, helpersConfig) {
  helpers = createHelpers(helpersConfig);
  const middleware = [
    sagaMiddleware,
    thunk.withExtraArgument(helpers),
  ];

  let enhancer;

  if (__DEV__) {
    // only on browser
    process.env.BROWSER && middleware.push(createLogger());

    // https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension
    let devToolsExtension = f => f;
    if (process.env.BROWSER && window.devToolsExtension) {
      devToolsExtension = window.devToolsExtension();
    }

    enhancer = compose(
      applyMiddleware(...middleware),
      devToolsExtension,
    );
  } else {
    enhancer = applyMiddleware(...middleware);
  }

  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  store = createStore(createReducer(), fromJS(initialState), enhancer);

  store.runSaga = (saga, ...args) => {
    return sagaMiddleware.run(saga, helpers, ...args);
  };
  store.asyncReducers = {}; // Async reducer registry

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (__DEV__ && module.hot) {
    module.hot.accept('../reducers', () => {
      // store.replaceReducer(require('../reducers').default),
      /* eslint-disable global-require */
      // eslint-disable-next-line global-require
      // import('../reducers').then((reducerModule) => {
        // const createReducers = reducerModule.default;
      const createReducers = require('../reducers').default;
      const nextReducers = createReducers(store.asyncReducers);

      store.replaceReducer(nextReducers);
      // });
    });
  }

  return store;
}
