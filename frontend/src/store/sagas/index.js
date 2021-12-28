import {all} from 'redux-saga/effects';
import {requestUtilsSaga} from '../../utils/RequestSagaUtils';
import authSaga from './auth';
import userSaga from './user';
import notificationSaga from './notification';
import articleSaga from './article';
import mentionSaga from './mention';
import alertSaga from './alert';
import folderSaga from './folder';
import layoutSaga from './layout';
function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    requestUtilsSaga(),
    notificationSaga(),
    articleSaga(),
    mentionSaga(),
    alertSaga(),
    folderSaga(),
    layoutSaga()
  ]);
}

export default rootSaga;
