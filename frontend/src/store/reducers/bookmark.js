import { ACTION_UPDATE_BOOKMARK } from '../constants';

const defaultState = {
  mentions: [],
};

const bookmarkReducer = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_UPDATE_BOOKMARK:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default bookmarkReducer;