import { create } from 'apisauce';

const API_V1 = create({
  baseURL: 'https://api.bangtin.vn/v2'
});

export default {
  refreshAccessToken: ({ refreshToken }) =>
    API_V1.post('auth/refresh-token', {
      refreshToken
    })
};
