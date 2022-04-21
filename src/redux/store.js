import { createStore, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { persistStore, persistReducer } from 'redux-persist';
import reduxStorage from 'redux-persist/lib/storage';
import {
  goBack,
} from './reducers';

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: [
    'goBack',
  ],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    goBack,
    form: reduxFormReducer,
  }),
);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
