import { all, takeLatest } from 'redux-saga/effects';

import { 
  ACTION_GET_FOLDERS, 
  ACTION_GET_DETAIL_FOLDERS,
  ACTION_POST_FOLDERS,
  ACTION_EDIT_FOLDERS,
  ACTION_DELETE_FOLDERS,  
} from '../constants';
import { getFolder ,saveFolder } from '../actions/folder';

import { createRequestSaga } from '../../utils/RequestSagaUtils';
import FolderAPIs from '../APIs/folder';

const requestGetFolder = createRequestSaga({
  request: FolderAPIs.getFolder,
  key: ACTION_GET_FOLDERS,
  tokenRequired: 'required',
  onSuccessActionCreators: [
    saveFolder,
  ]
});

const requestGetDetailFolder = createRequestSaga({
  request: FolderAPIs.getDetailFolder,
  key: ACTION_GET_DETAIL_FOLDERS,
  tokenRequired: 'required',
});

const requestPostFolder = createRequestSaga({
  request: FolderAPIs.postFolder,
  key: ACTION_POST_FOLDERS,
  tokenRequired: 'required',
  onSuccessActionCreators: [getFolder]
});

const requestEditFolder = createRequestSaga({
  key: args => `${ACTION_EDIT_FOLDERS}_${JSON.stringify(args.id)}`,
  request: FolderAPIs.editFolder,
  tokenRequired: 'required',
  onSuccessActionCreators: [getFolder]
});

const requestDeleteFolder = createRequestSaga({
  key: args => `${ACTION_DELETE_FOLDERS}_${JSON.stringify(args)}`,
  request: FolderAPIs.deleteFolder,
  tokenRequired: 'required',
  onSuccessActionCreators: [getFolder]
});

export default function* folderSaga () {
  yield all([
    takeLatest(ACTION_GET_FOLDERS, requestGetFolder),
    takeLatest(ACTION_GET_DETAIL_FOLDERS, requestGetDetailFolder),
    takeLatest(ACTION_POST_FOLDERS, requestPostFolder),
    takeLatest(ACTION_EDIT_FOLDERS, requestEditFolder),
    takeLatest(ACTION_DELETE_FOLDERS, requestDeleteFolder),
  ]);
}