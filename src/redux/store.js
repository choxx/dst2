import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import reduxStorage from 'redux-persist/lib/storage';
import {
  goBack, loader, notify, user, trainee,
} from './reducers';

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: [
    'goBack', 'user', 'trainee',
  ],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    goBack,
    loader,
    notify,
    user,
    trainee,
  }),
);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
