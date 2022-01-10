// import { AsyncStorage } from 'AsyncStorage';
import { AsyncStorage } from 'AsyncStorage';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import layout from './layout'
import { tokenReducer as token } from '../../utils/RequestSagaUtils';
import profile from './me';
import book from './book';
import libraryCard from './library-card';

const config = {
  key: 'root',
  timeout: 30000,
  storage: storage,
  whitelist: ['token', 'profile'],
  blacklist: ['form']
};

const formPersistConfig = {
  key: 'form',
  storage: storage,
  timeout: 10000,
  // whitelist: ['ExampleForm']
};

const searchPersistConfig = {
  key: 'searchReducer',
  storage: storage,
  timeout: 10000,
  whitelist: ['savedKeyword'],
};

const reducers = combineReducers({
  token,
  profile,
  book,
  libraryCard,
  layout,
});

export default persistReducer(config, reducers);
