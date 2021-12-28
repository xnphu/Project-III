import {
  ACTION_LOGIN,
  ACTION_REGISTER_WITH_PHONE,
  ACTION_VERIFY_WITH_PHONE,
  ACTION_REGISTER,
  ACTION_LOGIN_WITH_FACEBOOK,
  REQUEST_LOGIN_ANONYMOUSLY,
  ACTION_LOGOUT,
  REQUEST_FORGOT_PASSWORD,
  ACTION_UPDTATE_PW
} from '../constants';

export const loginAnonymously = callback => ({
  type: REQUEST_LOGIN_ANONYMOUSLY,
  args: [callback]
});

export const loginWithEmail = ({ username, password }, callback) => ({
  type: ACTION_LOGIN,
  args: [
    {
      username,
      password
    },
    callback
  ]
});

export const loginWithFacebook = (
  { accessToken, followingCategoryIds },
  callback
) => ({
  type: ACTION_LOGIN_WITH_FACEBOOK,
  args: [
    {
      accessToken,
      followingCategoryIds
    },
    callback
  ]
});

export const registerWithPhone = ({ phone }, callback) => ({
  type: ACTION_REGISTER_WITH_PHONE,
  args: [
    {
      phone
    },
    callback
  ]
});

export const verifyWithPhone = ({ }, callback) => ({
  type: ACTION_VERIFY_WITH_PHONE,
  args: [
    {
    },
    callback
  ]
});

export const register = (
  { email, password1, password2 },
  callback
) =>
  ({

    type: ACTION_REGISTER,
    args: [
      {
        // fullName,
        email,
        password1,
        password2
      },
      callback
    ]
  });

export const logout = () => ({
  type: ACTION_LOGOUT
});


export const forgotPassword = ({ accessToken, newPassword }, callback) => ({
  type: REQUEST_FORGOT_PASSWORD,
  args: [
    {
      accessToken,
      newPassword
    },
    callback
  ]
});
export const changePW = ({ old_password, new_password1, new_password2}, callback) => ({
  type: ACTION_UPDTATE_PW,
  args: [
    {
      old_password,
      new_password1,
      new_password2,
    },
    callback
  ]
});