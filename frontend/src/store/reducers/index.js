// import { AsyncStorage } from 'AsyncStorage';
import { AsyncStorage } from 'AsyncStorage';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import searchReducer from './search';
import notification from './notification';
import article from './article';
import reportReducer from './alert';
import bookmarkReducer from './bookmark'
import mentionDetailsReducer from './mention';
import folder from './folder'
import layout from './layout'
import { tokenReducer as token } from '../../utils/RequestSagaUtils';
import me from './me';
const config = {
  key: 'root',
  timeout: 30000,
  storage: storage,
  whitelist: ['token', 'me'],
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
  me,
  notification,
  article,
  reportReducer,
  mentionDetailsReducer,
  folder,
  layout,
  form: persistReducer(formPersistConfig, form),
  searchReducer: persistReducer(searchPersistConfig, searchReducer),
  bookmarkReducer,
});

export default persistReducer(config, reducers);
