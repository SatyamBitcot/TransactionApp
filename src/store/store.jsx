
import { configureStore } from '@reduxjs/toolkit';
import balanceReducer from './BalanceSlice';

const store = configureStore({
  reducer: {
    balance: balanceReducer,
  },
});

export default store;
