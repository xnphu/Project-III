import { API, API_V1, withToken } from '.';
export default {
  loginAnonymously: () => API_V1.post('auth/anonymous/token'),
  login: ({ username, password }) =>
    API_V1.post('auth/login/', {
      username,
      password
    }),
  loginWithFacebook: ({ accessToken, followingCategoryIds }) =>
    API_V1.post('auth/facebook/login', {
      accessToken,
      followingCategoryIds
    }),
  registerWithPhone: ({ }) =>
    API_V1.post('auth/phone/register', {

    }),
  verifyWithPhone: ({ }) =>
    API.get('categories', {

    }),
  register: ({
    email,
    password1,
    password2
  }) =>
    API_V1.post('auth/registration', {
      email,
      password1,
      password2
    }),
  forgotPassword: ({ accessToken, newPassword }) =>
    API_V1.post('auth/forgot-password', { accessToken, newPassword }),
  changePW: (token, { old_password, new_password1, new_password2 }) => withToken(token, API_V1.post, `/auth/password/change/?format=json`, { old_password, new_password1, new_password2 })
};
