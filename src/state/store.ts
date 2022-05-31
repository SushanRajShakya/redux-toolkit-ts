import { configureStore } from '@reduxjs/toolkit';

import { todoReducer } from './reducers';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export type StoreDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
