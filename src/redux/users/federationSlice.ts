import { createSlice } from "@reduxjs/toolkit";

interface FederationDetails {
  id: number;
  user_id: number;
  federation_type_id: number | null;
  name: string;
  bio: string | null;
  location: string | null;
  country: string | null;
  founded_year: number | null;
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
