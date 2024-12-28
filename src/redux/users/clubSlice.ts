import { createSlice } from "@reduxjs/toolkit";
import { ClubDetails } from "../../core/utils/globalUtils";

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
    setClubDetails: (state, action) => {
      state.details = action.payload;
      state.loading = false;
      state.error = null;
    },
    setClubLoading: (state, action) => {
      state.loading = action.payload;
    },
    setClubError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setClubDetails, setClubLoading, setClubError } =
  clubSlice.actions;
export default clubSlice.reducer;
