import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import reduxStorage from 'redux-persist/lib/storage';
import {
  goBack, loader, notify, user, trainee, phone,
} from './reducers';

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: [
    'goBack', 'user', 'trainee', 'phone',
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
    phone,
  }),
);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
