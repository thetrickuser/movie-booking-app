import { configureStore } from '@reduxjs/toolkit';
import {authApi} from './auth';
import {movieApi} from './movie';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [movieApi.reducerPath]: movieApi.reducer,
  },
  middleware: (mid) =>
    mid().concat(authApi.middleware).concat(movieApi.middleware),
});

export default store;
