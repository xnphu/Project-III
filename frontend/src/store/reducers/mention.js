import {
  REQUEST_MENTION_DETAILS,
  ACTION_UPDATE_MENTION_DETAILS,
  ACTION_UPDATE_ALERT_REPORT
} from '../constants';

const defaultState = {
  mentionDetails: [],
};

const mentionDetailsReducer = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_UPDATE_ALERT_REPORT:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default mentionDetailsReducer;
