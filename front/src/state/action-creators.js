import * as actions from "./action-types";

export function moveClockwise() {
  return { type: actions.MOVE_CLOCKWISE };
}

export function moveCounterClockwise() {
  return { type: actions.MOVE_COUNTERCLOCKWISE };
}

export function setMessage(message) {
  return { type: actions.SET_INFO_MESSAGE, payload: message };
}