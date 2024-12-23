import { createSlice } from "@reduxjs/toolkit";

interface ClubDetails {
  id: number;
  user_id: number;
  federation_id: number;
  bio: string;
  name: string;
  location: string;
  founded_year: number;
}

interface ClubState {
  details: ClubDetails | null;
}

const initialState: ClubState = {
  details: null,
};

const clubSlice = createSlice({
  name: "club",
  initialState,
  reducers: {
    setClubDetails: (state, action) => {
      state.details = action.payload;
    },
  },
});

export const { setClubDetails } = clubSlice.actions;
export default clubSlice.reducer;
