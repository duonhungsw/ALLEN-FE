import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, UserInfo, AuthTokens, LoginResponse } from "../types/authType";

const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  error: null,
  loading: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserInfo>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    setTokens(state, action: PayloadAction<AuthTokens>) {
      state.tokens = action.payload;
    },
    loginSuccess(state, action: PayloadAction<LoginResponse>) {
      state.user = action.payload.user;
      state.tokens = action.payload.tokens;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    refreshTokenSuccess(state, action: PayloadAction<AuthTokens>) {
      if (state.tokens) {
        state.tokens.accessToken = action.payload.accessToken;
        state.tokens.expiresIn = action.payload.expiresIn;
        state.tokens.tokenType = action.payload.tokenType;
      }
      state.isRefreshing = false;
    },
    setRefreshing(state, action: PayloadAction<boolean>) {
      state.isRefreshing = action.payload;
    },
    logout(state) {
      state.user = null;
      state.tokens = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.isRefreshing = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { 
  logout, 
  setUser, 
  setTokens,
  loginSuccess,
  refreshTokenSuccess,
  setRefreshing,
  setLoading, 
  setError 
} = authSlice.actions;
export default authSlice.reducer;
