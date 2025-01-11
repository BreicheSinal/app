import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AthleteDetails } from "../../core/utils/globalUtils";

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
    setAthleteDetails: (state, action: PayloadAction<AthleteDetails>) => {
      state.details = action.payload;
      state.loading = false;
      state.error = null;
    },
    setAthleteLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAthleteError: (state, action: PayloadAction<string>) => {
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
    addApplication: (state, action) => {
      if (state.details) {
        const tryOuts = state.details.tryOuts || [];
        state.details.tryOuts = [...tryOuts, action.payload];
      }
    },
    resetAthleteState: (state) => {
      Object.assign(state, initialState);
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
  addApplication,
  resetAthleteState,
} = athleteSlice.actions;

export default athleteSlice.reducer;
