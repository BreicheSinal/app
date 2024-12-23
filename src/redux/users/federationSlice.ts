import { createSlice } from "@reduxjs/toolkit";

interface FederationDetails {
  id: number;
  user_id: number;
  federation_type_id: number;
  name: string;
  bio: string;
  location: string;
  country: string;
  founded_year: number;
}

interface FederationState {
  details: FederationDetails | null;
}

const initialState: FederationState = {
  details: null,
};

const federationSlice = createSlice({
  name: "federation",
  initialState,
  reducers: {
    setFederationDetails: (state, action) => {
      state.details = action.payload;
    },
  },
});

export const { setFederationDetails } = federationSlice.actions;
export default federationSlice.reducer;
