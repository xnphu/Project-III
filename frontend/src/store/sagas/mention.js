import {
  REQUEST_MENTION_DETAILS,
  ACTION_UPDATE_MENTION_DETAILS
} from '../constants';

import { all, takeLatest, takeEvery } from 'redux-saga/effects';
import { createRequestSaga } from '../../utils/RequestSagaUtils';
import mentionAPI from '../APIs/mention';
import { updateMentionDetails } from '../../../src/store/actions/mention';
import {
  callSagaRequest,
  callSagaRequestWithErrorHandler,
} from '../../utils/RequestHandler';
const requestMentionDetails = createRequestSaga({
  request: mentionAPI.getMentionDetails,
  tokenRequired: 'required',
  key: args => `${REQUEST_MENTION_DETAILS}_${JSON.stringify(args)}`,
  onSuccessActionCreators: [updateMentionDetails],
});

export default function* alertReportSaga () {
  yield all([takeLatest(REQUEST_MENTION_DETAILS, requestMentionDetails)]);
}
