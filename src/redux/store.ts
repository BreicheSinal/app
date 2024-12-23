import { configureStore } from "@reduxjs/toolkit";

import athleteReducer from "./users/athleteSlice";
import coachReducer from "./users/coachSlice";
import clubReducer from "./users/clubSlice";
import federationReducer from "./users/federationSlice";

const store = configureStore({
  reducer: {
    athlete: athleteReducer,
    coach: coachReducer,
    club: clubReducer,
    federation: federationReducer,
  },
});

export default store;
