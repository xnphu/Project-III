import { REQUEST_ARTICLES,ACTION_UPDATE_ARTICLES } from '../constants';

const defaultState = {
  article: [],
};

const articleReducer = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_UPDATE_ARTICLES:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default articleReducer;
