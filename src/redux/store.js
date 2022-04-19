import { createStore, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { persistStore, persistReducer } from 'redux-persist';
import reduxStorage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    form: reduxFormReducer,
  })
);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
