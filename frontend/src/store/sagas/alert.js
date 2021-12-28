import {
  REQUEST_ALERT_REPORT,
  ACTION_UPDATE_ALERT_REPORT,
  ACTION_GET_ALERTS,
  ACTION_GET_ALERTS_DETAIL,
  ACTION_POST_ALERTS,
  ACTION_EDIT_ALERTS,
  ACTION_DELETE_ALERTS,
  ACTION_POST_ALERT_SCHEDULERS,
  ACTION_EDIT_ALERT_SCHEDULERS,
  REQUEST_ALERT_STATISTICS,
} from '../constants';
import { all, takeLatest, takeEvery } from 'redux-saga/effects';
import { createRequestSaga } from '../../utils/RequestSagaUtils';
import alertAPI from '../APIs/alert';
import { updateAlertReport, saveAlert } from '../../../src/store/actions/alert';
import { getFolder } from '../../../src/store/actions/folder';
import {
  callSagaRequest,
  callSagaRequestWithErrorHandler,
} from '../../utils/RequestHandler';

const requestGetAlert = createRequestSaga({
  request: alertAPI.getAlert,
  key: ACTION_GET_ALERTS,
  tokenRequired: 'required',
});

const requestGetAlertDetail = createRequestSaga({
  request: alertAPI.getAlertDetail,
  key: args => `${ACTION_GET_ALERTS_DETAIL}_${JSON.stringify(args)}`,
  tokenRequired: 'required',
});

const requestPostAlert = createRequestSaga({
  request: alertAPI.postAlert,
  key: ACTION_POST_ALERTS,
  tokenRequired: 'required',
  onSuccessActionCreators: [getFolder]
});

const requestEditAlert = createRequestSaga({
  key: args => `${ACTION_EDIT_ALERTS}_${JSON.stringify(args.id)}`,
  request: alertAPI.editAlert,
  tokenRequired: 'required',
  onSuccessActionCreators: [getFolder]
});

const requestDeleteAlert = createRequestSaga({
  key: args => `${ACTION_DELETE_ALERTS}_${JSON.stringify(args)}`,
  request: alertAPI.deleteAlert,
  tokenRequired: 'required',
  onSuccessActionCreators: [getFolder]
});

const requestPostAlertScheduler = createRequestSaga({
  request: alertAPI.postAlertScheduler,
  key: ACTION_POST_ALERT_SCHEDULERS,
  tokenRequired: 'required',
  onSuccessActionCreators: [getFolder]
});

const requestEditAlertScheduler = createRequestSaga({
  key: args => `${ACTION_EDIT_ALERT_SCHEDULERS}_${JSON.stringify(args.id)}`,
  request: alertAPI.editAlertScheduler,
  tokenRequired: 'required',
  onSuccessActionCreators: [getFolder]
});

const requestAlertReport = createRequestSaga({
  key: args => `${REQUEST_ALERT_REPORT}_${JSON.stringify(args)}`,
  request: alertAPI.getReport,
  tokenRequired: 'required',
  onSuccessActionCreators: [updateAlertReport],
});
const requestAlertsStatistics = createRequestSaga({
  key: args => `${REQUEST_ALERT_STATISTICS}_${JSON.stringify(args)}`,
  request: alertAPI.getAlertsMentionsStatistics,
  tokenRequired: 'required',
});
export default function* alertSaga () {
  yield all([
    takeLatest(REQUEST_ALERT_REPORT, requestAlertReport),
    takeLatest(ACTION_GET_ALERTS, requestGetAlert),
    takeLatest(ACTION_GET_ALERTS_DETAIL, requestGetAlertDetail),
    takeLatest(ACTION_POST_ALERTS, requestPostAlert),
    takeLatest(ACTION_EDIT_ALERTS, requestEditAlert),
    takeLatest(ACTION_DELETE_ALERTS, requestDeleteAlert),
    takeLatest(ACTION_POST_ALERT_SCHEDULERS, requestPostAlertScheduler),
    takeLatest(REQUEST_ALERT_STATISTICS, requestAlertsStatistics),
    takeLatest(ACTION_EDIT_ALERT_SCHEDULERS, requestEditAlertScheduler),
  ]);
}
