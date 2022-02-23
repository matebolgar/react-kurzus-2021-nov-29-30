import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import languageReducer from '../features/language/languageSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    language: languageReducer,
  },
});
