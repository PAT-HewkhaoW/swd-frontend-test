import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slice/appSlice";
import formReducer from "./slice/formSlice";

export const initStore = () => {
  return configureStore({
    reducer: {
      app: appReducer,
      form: formReducer,
    },
  });
};

export const store = initStore();
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
