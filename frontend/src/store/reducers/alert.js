import {  ACTION_UPDATE_ALERT_REPORT } from '../constants';

const defaultState = {
  reports: [],
};

const reportReducer = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_UPDATE_ALERT_REPORT:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default reportReducer;
