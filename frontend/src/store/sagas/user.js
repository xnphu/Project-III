import { all, takeLatest, select, takeEvery } from 'redux-saga/effects';


import {
  REQUEST_ME,
  ACTION_SAVE_ME,
  ACTION_REMOVE_ME,
  REQUEST_UPDATE_PROFILE,
} from '../constants';
import UserAPIs from '../APIs/user';
import { createRequestSaga } from '../../utils/RequestSagaUtils';

import { saveMe, updateMe,saveMe1 } from '../actions/user';
import { noop } from '../actions/common';
import {
  updateAccessToken,
  updateRefreshToken
} from '../../utils/RequestSagaUtils/token/actions';





const requestMe = createRequestSaga({
  request: UserAPIs.me,
  key: REQUEST_ME,
  tokenRequired: 'required',
  onSuccessActionCreators: [
    saveMe,
    params => {
      return noop();
    }

  ]
});

const requestUpdateMeDetails = createRequestSaga({
  key: args => `${REQUEST_UPDATE_PROFILE}_${JSON.stringify(args)}`,
  // eslint-disable-next-line import/no-named-as-default-member
  request: UserAPIs.getMeDetail,
  tokenRequired: 'required',
  onSuccessActionCreators: [
    saveMe1
  ]
});

const deleteMe = createRequestSaga({
  key: args => `${ACTION_REMOVE_ME}_${JSON.stringify(args)}`,
  // eslint-disable-next-line import/no-named-as-default-member
  request: UserAPIs.deleteMe,
  tokenRequired: 'required',
});

export default function* userSaga () {


  yield all([
    takeLatest(REQUEST_ME, requestMe),
    takeLatest(REQUEST_UPDATE_PROFILE, requestUpdateMeDetails),
    takeLatest(ACTION_REMOVE_ME, deleteMe),

  ]);
}
