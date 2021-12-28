import {
  REQUEST_NOTIFICATION,
  ACTION_UPDATE_NOTIFICATION,
  ACTION_READ_NOTIFICATION,
  READ_ALL_NOTIFICATION,
  ACTION_UPDATE_MORE_NOTIFICATION,
} from '../constants';

const defaultState = {};

const notificationReducer = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_UPDATE_NOTIFICATION:
      return {...state, ...payload};
    case ACTION_UPDATE_MORE_NOTIFICATION:
      let notifications = {...state};
      let next = payload.data.next;
      let results = [...notifications.data.results, ...payload.data.results];
      notifications.data.results = results;
      notifications.data.next = next;
      return {...state, ...notifications};
    default:
      return state;
  }
};

export default notificationReducer;
