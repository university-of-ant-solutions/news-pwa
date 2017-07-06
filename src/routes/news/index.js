import React from 'react';
import News from './News';
import Layout from '../../components/Layout';
import { getStore } from '../../store/configureStore';
import { getAsyncInjectors } from '../../utils/asyncInjectors';
import reducer from './reducer';
import sagas, { getNew } from './sagas';

const title = 'News';

async function action({ params }) {
  const store = getStore();

  const { injectReducer, injectSagas } = getAsyncInjectors(store);
  injectReducer('news', reducer);
  injectSagas(sagas);

  return {
    initData: () => {
      // server side rendering
      // run only on server
      // https://github.com/redux-saga/redux-saga/issues/13#issuecomment-182883680
      const getPageTask = store.runSaga(getNew, {
        id: params.id,
      });

      return [getPageTask.done];
    },
    chunks: ['news'],
    title,
    component: <Layout><News params={params} /></Layout>,
  };
}

export default action;
