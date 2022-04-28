import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import reduxStorage from 'redux-persist/lib/storage';
import {
  goBack, loader, notify, user,
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
    loader,
    notify,
    user,
  }),
);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
