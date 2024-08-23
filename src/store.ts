import { configureStore } from '@reduxjs/toolkit';
import gridReducer from './store/gridSlice';

const store = configureStore({
  reducer: {
    grid: gridReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
