import {all, takeLatest, takeEvery} from 'redux-saga/effects';
import {ACTION_UPDATE_ARTICLES,REQUEST_ARTICLES} from '../constants';
import {createRequestSaga} from '../../utils/RequestSagaUtils';
import ArticleAPI from '../APIs/article';
import {updateArticle} from '../../../src/store/actions/article';
import {
  callSagaRequest,
  callSagaRequestWithErrorHandler,
} from '../../utils/RequestHandler';

const requestArticle = createRequestSaga({
  request: ArticleAPI.getArticle,
  tokenRequired: 'required',
  key: REQUEST_ARTICLES,
  onSuccessActionCreators: [updateArticle],
});

export default function* articleSaga() {
  yield all([
    takeEvery(REQUEST_ARTICLES, requestArticle),
    takeLatest(ACTION_UPDATE_ARTICLES, updateArticle),
  ]);
}
