import { API_V1, withToken } from '.';

export default {
  getFolder: token => withToken(token, API_V1.get, 'folders/?format=json'),
  getDetailFolder: (token, { id }) => withToken(token, API_V1.get, `/folders/${id}/?format=json`),
  postFolder: (token, { name, parent_folder }) => withToken(token, API_V1.post, '/folders/?format=json', { name, parent_folder }),
  editFolder: (token, { id, name, parent_folder }) => withToken(token, API_V1.patch, `/folders/${id}/?format=json`, { name, parent_folder }),
  deleteFolder: (token, { id }) => withToken(token, API_V1.delete, `/folders/${id}/?format=json`),
};