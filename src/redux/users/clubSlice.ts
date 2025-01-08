import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClubDetails, Tryout } from "../../core/utils/globalUtils";

interface ClubState {
  details: ClubDetails | null;
  loading: boolean;
  error: string | null;
}

const initialState: ClubState = {
  details: null,
  loading: false,
  error: null,
};

const clubSlice = createSlice({
  name: "club",
  initialState,
  reducers: {
    setClubDetails: (state, action: PayloadAction<ClubDetails>) => {
      state.details = action.payload;
      state.loading = false;
      state.error = null;
    },
    setClubLoading: (state, action) => {
      state.loading = action.payload;
    },
    setClubError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    addTryout: (state, action: PayloadAction<Tryout>) => {
      if (state.details) {
        state.details.tryouts.push(action.payload);
      }
    },
    deleteTryout: (state, action: PayloadAction<number>) => {
      if (state.details?.tryouts) {
        state.details.tryouts = state.details.tryouts.filter(
          (tryout) => tryout.id !== action.payload
        );
      }
    },
    resetClubState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setClubDetails,
  setClubLoading,
  setClubError,
  addTryout,
  deleteTryout,
  resetClubState,
} = clubSlice.actions;

export default clubSlice.reducer;
