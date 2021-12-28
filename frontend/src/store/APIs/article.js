import { API, API_V1, withToken } from '.';
import qs from 'qs';

export default {
  getArticle: token => withToken(token, API_V1.get, 'articles'),
};
