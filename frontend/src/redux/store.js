import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import jobReducer from './jobSlice';
import companyReducer from './companySlice';
import applicationReducer from './applicationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobReducer,
    company: companyReducer,
    application: applicationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
