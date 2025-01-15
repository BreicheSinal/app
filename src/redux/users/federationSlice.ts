import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FederationDetails } from "../../core/utils/globalUtils";

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
    setFederationDetails: (state, action: PayloadAction<FederationDetails>) => {
      state.details = action.payload;
      state.loading = false;
      state.error = null;
    },
    setFederationLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setFederationError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    addFederationPost: (state, action) => {
      if (state.details) {
        const posts = state.details.posts || [];
        state.details.posts = [action.payload, ...posts];
      }
    },
    deletePost: (state, action) => {
      if (state.details?.posts) {
        state.details.posts = state.details.posts.filter(
          (post) => post.id !== action.payload
        );
      }
    },
    resetFederationState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setFederationDetails,
  setFederationLoading,
  setFederationError,
  addFederationPost,
  deletePost,
  resetFederationState,
} = federationSlice.actions;
export default federationSlice.reducer;
