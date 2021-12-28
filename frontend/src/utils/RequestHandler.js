
import   { store, persistor } from '../store/index';
import HTTPRequestError from './RequestSagaUtils/errors/HTTPRequestError';

import AccessTokenUnavailableError from './RequestSagaUtils/errors/AccessTokenUnavailableError';
import RequestCancelledError from './RequestSagaUtils/errors/RequestCancelledError';
import RequestNotDefinedError from './RequestSagaUtils/errors/RequestNotDefinedError';
import RequestTimeoutError from './RequestSagaUtils/errors/RequestTimeoutError';

export const callSagaRequestWithErrorHandler = (
  sagaRequestFunction,
  ...params
) => new Promise((resolve, reject) => {
  console.log("sagaRequestFunction",sagaRequestFunction);
  console.log("params",params);
  store.dispatch(
    sagaRequestFunction(...params, (err, ret) => {
      if (!err) {
        resolve(ret);
      } else if (err instanceof AccessTokenUnavailableError) {
        //Alert.alert(t('error.title'));
      } else if (err instanceof HTTPRequestError) {
      
      } else if (err instanceof RequestCancelledError) {
       // Alert.alert(t('error.title'));
      } else if (err instanceof RequestNotDefinedError) {
    //    Alert.alert(t('error.title'));
      } else if (err instanceof RequestTimeoutError) {
      //  Alert.alert(t('error.title'), t('error.requestTimeout'));
      } else {
     //   Alert.alert(t('error.title'), t('error.unknown'));
      }


      reject(err);
    })
  );
});

export const callSagaRequest = (sagaRequestFunction, ...params) => new Promise((resolve, reject) => {

console.log("sagaRequestFunction",sagaRequestFunction);
console.log("params",params);
  store.dispatch(
    sagaRequestFunction(...params, (err, ret) => {


      if (!err) {
        resolve(ret);
      }
      reject(err);
    })
  );
});
