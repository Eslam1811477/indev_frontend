import { configureStore } from "@reduxjs/toolkit";
import templatesReducer from "./templates/templates.slice";
import authReducer from "./auth/auth.slice";

export const store = configureStore({
  reducer: {
    templates: templatesReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
