import { all, takeLatest } from 'redux-saga/effects';
import { me } from '../actions/user';
import {
  ACTION_LOGIN,
  ACTION_REGISTER_WITH_PHONE,
  ACTION_VERIFY_WITH_PHONE,
  ACTION_REGISTER,
  ACTION_LOGIN_WITH_FACEBOOK,
  REQUEST_LOGIN_ANONYMOUSLY,
  REQUEST_FORGOT_PASSWORD,
  ACTION_UPDTATE_PW
} from '../constants';
import { createRequestSaga } from '../../utils/RequestSagaUtils';
import AuthAPIs from '../APIs/auth';
import {
  updateAccessToken,
  updateRefreshToken,
  setAnonymousToken
} from '../../utils/RequestSagaUtils/token/actions';
import { getFolder } from '../actions/folder';
import { getNotification } from '../actions/notification';
import { savePW } from '../actions/user';
const requestLoginAnonymously = createRequestSaga({
  request: AuthAPIs.loginAnonymously,
  key: REQUEST_LOGIN_ANONYMOUSLY,
  onSuccessActionCreators: [setAnonymousToken]
});

const requestLogin = createRequestSaga({
  request: AuthAPIs.login,
  key: ACTION_LOGIN,
  onSuccessActionCreators: [updateAccessToken, updateRefreshToken, me, getFolder, getNotification]
});



const requestRegisterWithPhone = createRequestSaga({
  request: AuthAPIs.registerWithPhone,
  key: ACTION_REGISTER_WITH_PHONE
});

const requestVerifyWithPhone = createRequestSaga({
  request: AuthAPIs.verifyWithPhone,
  key: ACTION_VERIFY_WITH_PHONE
});

const requestRegister = createRequestSaga(
  {
    request: AuthAPIs.register,
    key: ACTION_REGISTER,
    onSuccessActionCreators: [updateAccessToken, updateRefreshToken, getFolder, getNotification]
  });

const requestForgotPassword = createRequestSaga({
  request: AuthAPIs.forgotPassword,
  key: REQUEST_FORGOT_PASSWORD,
  tokenRequired: 'non_required'
})
const requestUpdatePW = createRequestSaga({
  key: ACTION_UPDTATE_PW,
  request: AuthAPIs.changePW,
  tokenRequired: 'required'
});
export default function* authSaga () {

  yield all([
    takeLatest(ACTION_VERIFY_WITH_PHONE, requestVerifyWithPhone),
    takeLatest(ACTION_REGISTER, requestRegister),
    takeLatest(ACTION_LOGIN, requestLogin),
    takeLatest(ACTION_UPDTATE_PW, requestUpdatePW)
  ]);
}
