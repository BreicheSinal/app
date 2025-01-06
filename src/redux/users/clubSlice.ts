import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClubDetails } from "../../core/utils/globalUtils";

interface Tryout {
  id: number;
  name: string;
  date: string;
  description: string;
}

interface ClubState {
  details: ClubDetails | null;
  tryouts: Tryout[];
  loading: boolean;
  error: string | null;
}

const initialState: ClubState = {
  details: null,
  tryouts: [],
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
    setClubLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setClubError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    addTryout: (state, action: PayloadAction<Tryout>) => {
      state.tryouts.push(action.payload);
    },
    deleteTryout: (state, action: PayloadAction<number>) => {
      state.tryouts = state.tryouts.filter(
        (tryout) => tryout.id !== action.payload
      );
    },
  },
});

export const {
  setClubDetails,
  setClubLoading,
  setClubError,
  addTryout,
  deleteTryout,
} = clubSlice.actions;

export default clubSlice.reducer;
