import { createSlice } from "@reduxjs/toolkit";
import { CoachDetails } from "../../core/utils/globalUtils";

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
      state.loading = false;
      state.error = null;
    },
    setCoachLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCoachError: (state, action) => {
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
  },
});

export const {
  setCoachDetails,
  setCoachLoading,
  setCoachError,
  addExperience,
  updateExperience,
  deleteExperience,
} = coachSlice.actions;
export default coachSlice.reducer;
