import { createSelector } from 'reselect';

const selectNews = state => state.get('news');

const makeSelectId = () => createSelector(
  selectNews,
  homeState => homeState.get('id'),
);

const makeSelectData = () => createSelector(
  selectNews,
  homeState => homeState.get('data'),
);

export {
  selectNews,
  makeSelectId,
  makeSelectData,
};
