import {all} from 'redux-saga/effects';
import {requestUtilsSaga} from '../../utils/RequestSagaUtils';
import authSaga from './auth';
import userSaga from './user';
import layoutSaga from './layout';
function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    requestUtilsSaga(),
    layoutSaga()
  ]);
}

export default rootSaga;
