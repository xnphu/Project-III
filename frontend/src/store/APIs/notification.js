import {API, API_V1, withToken} from '.';
import qs from 'qs';

export default {
  getNoti: token => withToken(token, API_V1.get, 'notifications/?format=json'),
  readNoti: (token, {pk}) =>
    withToken(token, API_V1.patch, `notifications/${pk}/?format=json`, {
      being_opened: true,
    }),
  readAll: token => withToken(token, API_V1.post, `notifications/read_all`),
  loadMore: (token, {page}) =>
    withToken(token, API_V1.get, `notifications/?format=json&page=${page}`),
};
