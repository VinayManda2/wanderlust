import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import itemReducer from './itemSlice';

const store = configureStore({
  reducer: {
    item: itemReducer,
    auth: authReducer,
  },
});

export default store;
