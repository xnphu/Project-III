import {API, API_V1, withToken} from '.';
import qs from 'qs';

export default {
  getMentionDetails: (token, {id}) =>
    withToken(token, API_V1.get, `mentions/${id}/?format=json`),
};
