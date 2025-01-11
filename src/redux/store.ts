import { configureStore } from "@reduxjs/toolkit";

import athleteReducer from "./users/athleteSlice";
import coachReducer from "./users/coachSlice";
import clubReducer from "./users/clubSlice";
import federationReducer from "./users/federationSlice";
import tryOutsReducer from "./users/tryOutSlice";

const store = configureStore({
  reducer: {
    athlete: athleteReducer,
    coach: coachReducer,
    club: clubReducer,
    federation: federationReducer,
    tryOuts: tryOutsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
