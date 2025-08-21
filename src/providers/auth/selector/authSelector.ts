import { RootState } from "../../store";

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectAuthUser = (state: RootState) => state.auth.user;

export const selectAuthTokens = (state: RootState) => state.auth.tokens;

export const selectAccessToken = (state: RootState) => state.auth.tokens?.accessToken;

export const selectRefreshToken = (state: RootState) => state.auth.tokens?.refreshToken;

export const selectAuthLoading = (state: RootState) => state.auth.loading;

export const selectAuthError = (state: RootState) => state.auth.error;

export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;
