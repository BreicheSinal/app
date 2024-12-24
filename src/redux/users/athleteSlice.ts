import { createSlice } from "@reduxjs/toolkit";

interface AthleteDetails {
  id: number;
  user_id: number;
  name: string;
  bio: string | null;
  role: string;
  club_id: number | null;
  position: string | null;
  age: number | null;
  height: number | null;
  weight: number | null;
}

interface AthleteState {
  details: AthleteDetails | null;
}

const initialState: AthleteState = {
  details: null,
};

const athleteSlice = createSlice({
  name: "athlete",
  initialState,
  reducers: {
    setAthleteDetails: (state, action) => {
      state.details = action.payload;
    },
  },
});

export const { setAthleteDetails } = athleteSlice.actions;
export default athleteSlice.reducer;
