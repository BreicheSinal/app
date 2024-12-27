import { createSlice } from "@reduxjs/toolkit";

interface Experience {
  id: string;
  name: string;
  year: string;
  description: string;
}

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
  experiences?: Experience[];
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
    addExperience: (state, action) => {
      if (state.details) {
        const experiences = state.details.experiences || [];
        state.details.experiences = [...experiences, action.payload];
      }
    },
    updateExperience: (state, action) => {
      if (state.details?.experiences) {
        state.details.experiences = state.details.experiences.map((exp) =>
          exp.id === action.payload.id ? action.payload : exp
        );
      }
    },
    deleteExperience: (state, action) => {
      if (state.details?.experiences) {
        state.details.experiences = state.details.experiences.filter(
          (exp) => exp.id !== action.payload
        );
      }
    },
    setExperiences: (state, action) => {
      if (state.details) {
        state.details.experiences = action.payload;
      }
    },
  },
});

export const {
  setAthleteDetails,
  setAthleteLoading,
  setAthleteError,
  addExperience,
  updateExperience,
  deleteExperience,
  setExperiences,
} = athleteSlice.actions;

export default athleteSlice.reducer;
