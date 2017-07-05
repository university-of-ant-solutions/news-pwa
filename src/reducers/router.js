import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from '../actions/router';

// Initial routing state
const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

export default function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload.path,
      });
    default:
      return state;
  }
}
