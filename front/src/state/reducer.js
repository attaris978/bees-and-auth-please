import { combineReducers } from 'redux'
import * as actions from './action-types';

const initialWheelState = 0;
function wheel(state = initialWheelState, action) {
  switch(action.type) {
    case actions.MOVE_CLOCKWISE:
      return state === 5 ? 0 :  state + 1;  
    case actions.MOVE_COUNTERCLOCKWISE:
      return state === 0 ? 5 :  state - 1;
    default:
      return state
  }
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  switch(action.type) {
    case actions.SET_INFO_MESSAGE:
      console.log(state, action.payload);
      return action.payload.message;
      default:
        return state;
  }
}

export default combineReducers({ wheel, infoMessage })
