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
import author from './author';
import libraryCard from './library-card';
import bookReserve from './book-reserve';
import bookLend from './book-lend';
import feedback from './feedback';

const config = {
  key: 'root',
  timeout: 30000,
  storage: storage,
  whitelist: ['token', 'profile', 'author', 'book', 'libraryCard', 'bookReserve', 'bookLend', 'feedback'],
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
  author,
  book,
  libraryCard,
  bookReserve,
  bookLend,
  feedback,
  layout,
});

export default persistReducer(config, reducers);
