// const selectHome = state => state.get('home');
export const LOCATION_CHANGE = 'LOCATION_CHANGE';

const ACTIONS = ['POP', 'PUSH'];

export function locationChange(path) {
  return {
    type: LOCATION_CHANGE,
    payload: {
      path,
    },
  };
}

export default function watchLocationChange(store) {
  return (location, action) => {
    const path = store.getState().get('router').get('locationBeforeTransitions');
    if (location.pathname !== path && ACTIONS.indexOf(action) !== -1) {
      store.dispatch(locationChange(location.pathname));
    }
  };
}
