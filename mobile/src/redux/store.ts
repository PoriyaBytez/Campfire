import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import combineReducer from "~redux/reducer";

const store = configureStore({
  reducer: combineReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
