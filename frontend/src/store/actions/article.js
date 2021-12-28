import { ACTION_UPDATE_ARTICLES,REQUEST_ARTICLES} from '../constants';

export const getArticle = () => ({
  type: REQUEST_ARTICLES,
});
export const updateArticle = data => ({
  type: ACTION_UPDATE_ARTICLES,
  payload: {
    data,
  },
});
