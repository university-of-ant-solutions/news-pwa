import { fromJS } from 'immutable';
import { SET_RUNTIME_VARIABLE, INITIALNOW } from '../constants';

// Initial routing state
const routeInitialState = fromJS({
  [INITIALNOW]: null,
});

export default function runtime(state = routeInitialState, action) {
  switch (action.type) {
    case SET_RUNTIME_VARIABLE:
      return state.merge({
        [INITIALNOW]: action.payload.value,
      });
    default:
      return state;
  }
}
