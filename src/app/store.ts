import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import loginReducer from "../pages/Login/loginSlice";
import registerReducer from "../pages/Register/registerSlice";
import eventReducer from "../pages/Event/eventSplice";
import eventListReducer from "../pages/EventList/eventListSplice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    event: eventReducer,
    eventList: eventListReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
