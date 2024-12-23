import { createSlice } from "@reduxjs/toolkit";

interface AthleteDetails {
  id: number;
  user_id: number;
  name: string;
  bio: string;
  role: string;
  club_id: number;
  position: string;
  age: number;
  height: number;
  weight: number;
}

interface AthleteSate {
  details: AthleteDetails | null;
}

const initialState: AthleteSate = {
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
