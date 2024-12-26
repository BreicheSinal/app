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
  loading: boolean;
  error: string | null;
}

const initialState: CoachState = {
  details: null,
  loading: false,
  error: null,
};

const coachSlice = createSlice({
  name: "coach",
  initialState,
  reducers: {
    setCoachDetails: (state, action) => {
      state.details = action.payload;
    },
    setCoachLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCoachError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setCoachDetails, setCoachLoading, setCoachError } =
  coachSlice.actions;
export default coachSlice.reducer;
