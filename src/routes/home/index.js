import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';
import { getStore } from '../../store/configureStore';
import { getAsyncInjectors } from '../../utils/asyncInjectors';
import reducer from './reducer';
import sagas, { getPage } from './sagas';

async function action({ query, fetch }) {
  const store = getStore();

  const { injectReducer, injectSagas } = getAsyncInjectors(store);
  injectReducer('home', reducer);
  injectSagas(sagas);

  const currentPage = parseInt(query.page, 10) || 1;
  const resp = await fetch(`/api/v1/news?page=${currentPage}`, {});
  const r = await resp.json();
  if (!r || !r.data) throw new Error('Failed to load the news feed.');
  return {
    initData: () => {
      // server side rendering
      // run only on server
      // https://github.com/redux-saga/redux-saga/issues/13#issuecomment-182883680
      const getPageTask = store.runSaga(getPage, {
        page: currentPage,
      });

      return [getPageTask.done];
    },
    chunks: ['home'],
    title: 'React Starter Kit',
    component: <Layout>
      <Home currentPage={currentPage} />
    </Layout>,
  };
}

export default action;
