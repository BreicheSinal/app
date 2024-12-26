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
  loading: boolean;
  error: string | null;
}

const initialState: FederationState = {
  details: null,
  loading: false,
  error: null,
};

const federationSlice = createSlice({
  name: "federation",
  initialState,
  reducers: {
    setFederationDetails: (state, action) => {
      state.details = action.payload;
    },
    setFederationLoading: (state, action) => {
      state.loading = action.payload;
    },
    setFederationError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setFederationDetails,
  setFederationLoading,
  setFederationError,
} = federationSlice.actions;
export default federationSlice.reducer;
