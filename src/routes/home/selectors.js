import { createSelector } from 'reselect';

const selectHome = state => state.get('home');

const makeSelectPageInfo = () => createSelector(
  selectHome,
  homeState => homeState.get('pageInfo'),
);

const makeSelectList = () => createSelector(
  selectHome,
  homeState => homeState.get('list'),
);

export {
  selectHome,
  makeSelectPageInfo,
  makeSelectList,
};
