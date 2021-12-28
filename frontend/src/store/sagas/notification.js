import {all, takeLatest, takeEvery} from 'redux-saga/effects';
import {
  REQUEST_NOTIFICATION,
  ACTION_UPDATE_NOTIFICATION,
  ACTION_READ_NOTIFICATION,
  READ_ALL_NOTIFICATION,
  LOAD_MORE_NOTIFICATION,
  ACTION_UPDATE_MORE_NOTIFICATION,
} from '../constants';
import {createRequestSaga} from '../../utils/RequestSagaUtils';
import NotiAPI from '../APIs/notification';
import {
  updateNotification,
  updateMoreNotification,
} from '../../../src/store/actions/notification';
import {
  callSagaRequest,
  callSagaRequestWithErrorHandler,
} from '../../utils/RequestHandler';
const requestNotification = createRequestSaga({
  request: NotiAPI.getNoti,
  tokenRequired: 'required',
  key: REQUEST_NOTIFICATION,
  onSuccessActionCreators: [updateNotification],
});
const readNotification = createRequestSaga({
  request: NotiAPI.readNoti,
  tokenRequired: 'required',
  key: ACTION_READ_NOTIFICATION,
  onSuccessActionCreators: [],
});
const readAll = createRequestSaga({
  request: NotiAPI.readAll,
  tokenRequired: 'required',
  key: READ_ALL_NOTIFICATION,
  onSuccessActionCreators: [],
});
const loadMore = createRequestSaga({
  request: NotiAPI.loadMore,
  tokenRequired: 'required',
  key: LOAD_MORE_NOTIFICATION,
  onSuccessActionCreators: [updateMoreNotification],
});

export default function* notificationSaga() {
  yield all([
    takeEvery(REQUEST_NOTIFICATION, requestNotification),
    takeLatest(ACTION_UPDATE_NOTIFICATION, updateNotification),
    takeLatest(ACTION_UPDATE_MORE_NOTIFICATION, updateMoreNotification),
    takeLatest(ACTION_READ_NOTIFICATION, readNotification),
    takeLatest(READ_ALL_NOTIFICATION, readAll),
    takeLatest(LOAD_MORE_NOTIFICATION, loadMore),
  ]);
}
