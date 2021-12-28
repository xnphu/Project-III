import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from "./store/index"
import { PersistGate } from 'redux-persist/integration/react'
const app = (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>

    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
