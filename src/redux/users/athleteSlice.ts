import { createSlice } from "@reduxjs/toolkit";

interface AthleteDetails {
  id: number;
  user_id: number;
  name: string;
  bio: string | null;
  role: string;
  club_id: number | null;
  club: string | null;
  position: string | null;
  age: number | null;
  height: number | null;
  weight: number | null;
}

interface AthleteState {
  details: AthleteDetails | null;
  loading: boolean;
  error: string | null;
}

const initialState: AthleteState = {
  details: null,
  loading: false,
  error: null,
};

const athleteSlice = createSlice({
  name: "athlete",
  initialState,
  reducers: {
    setAthleteDetails: (state, action) => {
      state.details = action.payload;
      state.loading = false;
      state.error = null;
    },
    setAthleteLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAthleteError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setAthleteDetails, setAthleteLoading, setAthleteError } =
  athleteSlice.actions;

export default athleteSlice.reducer;
