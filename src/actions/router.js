// const selectHome = state => state.get('home');

export const LOCATION_CHANGE = 'LOCATION_CHANGE';

const ACTIONS = ['POP', 'PUSH'];

export default function watchLocationChange(store) {
  return (location, action) => {
    console.log(location.pathname, store.getState().get('router').toJS());
    if (ACTIONS.indexOf(action) !== -1) {
      store.dispatch({
        type: LOCATION_CHANGE,
        path: location.pathname,
      });
    }
  };
}
