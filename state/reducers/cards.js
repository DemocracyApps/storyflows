import { SET_CARDS_STATE } from '../actions/ActionTypes';
import { fromJS } from 'immutable';

function setState (state, newState) {
  return state.merge(newState);
}

export default function cards(state, action, fullState = null) {
  if (state == undefined) {
    state = fromJS( { cards: {} } );
  }

  switch (action.type) {

    case SET_CARDS_STATE:
      return setState(state, action.state);

    default:
      return state;
    }
}
