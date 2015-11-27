//import { combineReducers } from 'redux';
import site from './site';
import cards from './cards';

/*
 * Not using Redux combineReducers because I prefer something this simple to be explicit in the code.
 */
export default function rootReducer (state = {}, action) {
  console.log("In with action " + action.type);
  let newState = {
    site:   site (state.site, action),
    cards:  cards (state.cards, action),
  };
  return newState;
}