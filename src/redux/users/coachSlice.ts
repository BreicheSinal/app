import { createSlice } from "@reduxjs/toolkit";

interface CoachDetails {
  id: number;
  user_id: number;
  club_id: number | null;
  club: string | null;
  name: string;
  bio: string | null;
  specialty: string | null;
}

interface CoachState {
  details: CoachDetails | null;
}

const initialState: CoachState = {
  details: null,
};

const coachSlice = createSlice({
  name: "coach",
  initialState,
  reducers: {
    setCoachDetails: (state, action) => {
      state.details = action.payload;
    },
  },
});

export const { setCoachDetails } = coachSlice.actions;
export default coachSlice.reducer;
