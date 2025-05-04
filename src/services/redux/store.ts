import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/authSlice';
import moduleReducer from './features/modules/moduleSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    module: moduleReducer
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
