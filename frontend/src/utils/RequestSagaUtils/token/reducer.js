import {
  ACTION_UPDATE_ACCESS_TOKEN,
  ACTION_REMOVE_ACCESS_TOKEN,
  ACTION_UPDATE_REFRESH_TOKEN,
  ACTION_REMOVE_REFRESH_TOKEN,
  ACTION_SET_ANONYMOUS_TOKEN,
  ACTION_UNSET_ANONYMOUS_TOKEN,
  ACTION_UPDATE_ROLE,
  ACTION_REMOVE_ROLE
} from '../constants';

const defaultState = {
  token: '',
  role: '',
};

export default (state = defaultState, action) => {
  const { type, payload } = action;


  if (type === ACTION_UPDATE_ACCESS_TOKEN) {
    const { token } = payload;
    return {
      ...state,
      token: token
    };
  }
  if (type === ACTION_REMOVE_ACCESS_TOKEN) {
    return {
      ...state,
      token: ''
    };
  }
  // if (type === ACTION_UPDATE_REFRESH_TOKEN) {
  //   const { token } = payload;
  //   return {
  //     ...state,
  //     refreshToken: token
  //   };
  // }
  if (type === ACTION_REMOVE_REFRESH_TOKEN) {
    return {
      ...state,
      refreshToken: ''
    };
  }
  if (type === ACTION_SET_ANONYMOUS_TOKEN) {
    const { anonymousToken } = payload;
    return {
      ...state,
      anonymousToken
    };
  }
  if (type === ACTION_UNSET_ANONYMOUS_TOKEN) {
    return {
      ...state,
      anonymousToken: ''
    };
  }
  if (type === ACTION_UPDATE_ROLE) {
    const { role } = payload;
    return {
      ...state,
      role
    };
  }
  if (type === ACTION_REMOVE_ROLE) {
    return {
      ...state,
      role: ''
    };
  }
  return state;
};
