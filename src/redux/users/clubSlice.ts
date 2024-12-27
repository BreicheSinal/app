import { createSlice } from "@reduxjs/toolkit";

interface ClubDetails {
  id: number;
  user_id: number;
  federation_id: number | null;
  federation: string | null;
  bio: string | null;
  name: string;
  location: string | null;
  founded_year: number | null;
}

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
