import React from 'react';
import Layout from '../../components/Layout';
import News from './News';

const title = 'News';

async function action({ params, fetch }) {
  const resp = await fetch(`/api/v1/news/${params.id}`, {});
  const data = await resp.json();
  if (!data) throw new Error('Failed to load the news feed.');
  return {
    chunks: ['news'],
    title,
    component: <Layout><News data={data} params={params} /></Layout>,
  };
}

export default action;
