import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';
import { getStore } from '../../store/configureStore';
import { getAsyncInjectors } from '../../utils/asyncInjectors';
import reducer from './reducer';
import sagas, { getRepos } from './sagas';

async function action({ query, fetch }) {
  const store = getStore();

  const { injectReducer, injectSagas } = getAsyncInjectors(store);
  injectReducer('home', reducer);
  injectSagas(sagas);

  const currentPage = query.page || 1;
  const resp = await fetch(`/api/v1/news?page=${currentPage}`, {});
  const r = await resp.json();
  if (!r || !r.data) throw new Error('Failed to load the news feed.');
  return {
    initData: () => {
      // server side rendering
      // run only on server
      const task = store.runSaga(getRepos);
      return [task.done];
    },
    chunks: ['home'],
    title: 'React Starter Kit',
    component: <Layout>
      <Home currentPage={currentPage} pageInfo={r.paging} news={r.data} />
    </Layout>,
  };
}

export default action;
