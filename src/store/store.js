import { configureStore } from '@reduxjs/toolkit';
import {authApi} from '../api/authApi';
import {movieApi} from '../api/movieApi';
import bookingSlice from './bookingSlice';
import userDetailsSlice from './userDetailsSlice';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [movieApi.reducerPath]: movieApi.reducer,
    [bookingSlice.name]: bookingSlice.reducer,
    [userDetailsSlice.name]: userDetailsSlice.reducer
  },
  middleware: (mid) =>
    mid().concat(authApi.middleware).concat(movieApi.middleware),
});

export default store;
