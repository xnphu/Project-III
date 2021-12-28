import qs from 'qs';
import { API, API_V1, withToken } from '.';

export default {
  me: token => withToken(token, API_V1.get, `users/?format=json`),
  getMeDetail: (token, { username, root_folder, first_name, last_name, profile , id }) => withToken(token, API_V1.patch, `/users/${id}/?format=json`, {
    username,
    root_folder,
    first_name,
    last_name,
    profile
  }),
  deleteMe: (token, {  id }) => withToken(token, API_V1.delete, `/users/${id}/?format=json`,)
};
