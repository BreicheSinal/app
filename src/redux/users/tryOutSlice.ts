import { createSlice } from "@reduxjs/toolkit";
import { AthleteTryOut } from "../../core/utils/globalUtils";

export interface TryOutApplication {
  athlete_id: number;
  try_out_id: number;
  status: "pending" | "accepted" | "rejected";
}

interface TryOutState {
  tryOuts: AthleteTryOut[];
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
