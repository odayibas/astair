export const authsignin = state => {
  return {
    type: 'SIGNIN',
    payload: {state},
  };
};
export const authsignout = state => {
  return {
    type: 'SIGNOUT',
    payload: {state},
  };
};
export const selectStartTime = state => {
  return {
    type: 'StartTime',
    payload: {state},
  };
};
export const selectRoom = state => {
  return {
    type: 'Room',
    payload: {state},
  };
};
export const selectEndTime = state => {
  return {
    type: 'EndTime',
    payload: {state},
  };
};
export const people = state => {
  return {
    type: 'People',
    payload: {state},
  };
};
