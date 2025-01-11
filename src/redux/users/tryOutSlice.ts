import { createSlice } from "@reduxjs/toolkit";

export interface ViewTryOuts {
  id: number;
  name: string;
  date: string;
  description: string;
  meetingUrl: string;
  club_id: number;
  club_user_id: number;
  club_name: string;
}

interface TryOutState {
  tryOuts: ViewTryOuts[];
}

const initialState: TryOutState = {
  tryOuts: [],
};

const tryOutSlice = createSlice({
  name: "tryOuts",
  initialState,
  reducers: {
    setTryOuts: (state, action) => {
      state.tryOuts = action.payload;
    },
    resetTryOutsState: (state) => {
      state.tryOuts = [];
    },
  },
});

export const { setTryOuts, resetTryOutsState } = tryOutSlice.actions;

export default tryOutSlice.reducer;
