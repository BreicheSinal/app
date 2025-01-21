import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ValidRoleType } from "../../core/utils/globalUtils";

interface AuthState {
  role: ValidRoleType | null;
  roleId: number | null;
  isInitialized: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  role: null,
  roleId: null,
  isInitialized: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (
      state,
      action: PayloadAction<{
        role: ValidRoleType | null;
        roleId: number | null;
      }>
    ) => {
      state.role = action.payload.role;
      state.roleId = action.payload.roleId;
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearAuth: (state) => {
      state.role = null;
      state.roleId = null;
      state.isInitialized = false;
    },
  },
});

export const { setAuthState, setInitialized, setLoading, clearAuth } =
  authSlice.actions;
export default authSlice.reducer;
