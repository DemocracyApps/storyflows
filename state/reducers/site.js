import { SET_SITE_STATE, GOTO_PAGE, REGISTER_RECEIVED_DATASET, SET_COMPONENT_STATE } from '../actions/ActionTypes';
import { fromJS } from 'immutable';

function setState (state, newState) {
  return state.merge(newState)
}

export default function site(state, action, fullState = null) {
  if (state == undefined) {
    state = fromJS( { name: "Unknown" } );
  }

  switch (action.type) {

    case SET_SITE_STATE:
      return setState(state, action.state);

    default:
      return state;
    }
}
