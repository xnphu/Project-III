import { AsyncStorage } from 'AsyncStorage';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './sagas';


const sagaMiddlewares = createSagaMiddleware();
const middlewares = [sagaMiddlewares];

// eslint-disable-next-line no-undef
// if (__DEV__) {
//     !window.devToolsExtension && middlewares.push(logger);
//     global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
//     global.FormData = global.originalFormData || global.FormData;
//     global.Blob = global.originalBlob || global.Blob;
//     global.FileReader = global.originalFileReader || global.FileReader;
// }

const configStore = () => {
    const enhancer = [applyMiddleware(...middlewares)];
    window.devToolsExtension && enhancer.push(window.devToolsExtension());

    const reduxDevTools =
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

    let persistedReducer = null;
    persistedReducer = reducers;

    const store = createStore(
        persistedReducer,
        undefined,
        compose(...enhancer)
    );
    sagaMiddlewares.run(rootSaga);
    store.subscribe(() => console.log('redux store: ', store.getState()));
    console.log("store", store);
    let persistor = persistStore(store);
    return {
        store,
        persistor
    };
};
const { store, persistor } = configStore();
export { store, persistor };
// const store = createStore(
//     persistedReducer,
//     undefined,
//     compose(...enhancer)
// );
// sagaMiddlewares.run(rootSaga);
// store.subscribe(() => console.log('redux store: ', store.getState()));
// export default store;