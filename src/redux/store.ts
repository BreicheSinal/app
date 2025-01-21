import { configureStore, combineReducers, AnyAction } from "@reduxjs/toolkit";

import athleteReducer from "./users/athleteSlice";
import coachReducer from "./users/coachSlice";
import clubReducer from "./users/clubSlice";
import federationReducer from "./users/federationSlice";
import tryOutsReducer from "./users/tryOutSlice";
import authReducer from "./users/authSlice";

const combinedReducers = combineReducers({
  athlete: athleteReducer,
  coach: coachReducer,
  club: clubReducer,
  federation: federationReducer,
  tryOuts: tryOutsReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof combinedReducers>;

const rootReducer = (state: RootState | undefined, action: AnyAction) => {
  if (action.type === "RESET_ALL_STATE") {
    state = undefined;
  }
  return combinedReducers(state, action);
};

const store = configureStore({ reducer: rootReducer });

export const resetAllState = () => ({
  type: "RESET_ALL_STATE" as const,
});

export type AppDispatch = typeof store.dispatch;
export default store;
