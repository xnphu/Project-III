import {
  ACTION_SAVE_USER_ID,
  ACTION_SAVE_ME,
  ACTION_SAVE_ME1,
  ACTION_REMOVE_ME,
  ACTION_LOGOUT,
  ACTION_UPDTATE_ME,
  ACTION_LOGIN,
  ACTION_REGISTER,
  ACTION_SUCCESS_UPDTATE_PW
} from '../constants';

const defaultState = {
  city: '',
  country: '',
  date_of_birth: '',
  email: '',
  id: '',
  name: '',
  phone: '',
  role: 2,
  sex: 1,
  status: 1,
  street: '',
  student_id: '',
  username: '',
};

export default (state = defaultState, action) => {
  const { type, payload, args } = action;


  if (type === ACTION_LOGIN) {
    return {
      ...state,
      // password: args[0].password
    };
  }
  if (type === ACTION_REGISTER) {
    return {
      ...state,
      password: args[0].password1
    };
  }
  if (type === ACTION_SUCCESS_UPDTATE_PW) {
    return {
      ...state,
      password: args[0].password
    };
  }
  if (type === ACTION_SAVE_ME) {
    return {
      ...state,
      ...payload
    };
  }
  if (type === ACTION_SAVE_ME1) {
    return {
      ...state,
      profile: { ...payload }
    };
  }
  if (type === ACTION_UPDTATE_ME) {
    return {
      ...state,
      profile: { ...state.profile, ...payload }
    };
  }

  if (type === ACTION_REMOVE_ME) {
    return {
      ...state,
      profile: {}
    };
  }

  if (type === ACTION_LOGOUT) {
    return {};
  }

  return state;
};
