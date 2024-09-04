import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import countriesReducer from './countriesSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['countries'],
};

const persistedReducer = persistReducer(persistConfig, countriesReducer);

export const store = configureStore({
  reducer: {
    countries: persistedReducer,
  },
});

export const persistor = persistStore(store);
