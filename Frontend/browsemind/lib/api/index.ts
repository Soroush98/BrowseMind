/**
 * API module exports.
 */
export { apiClient, ApiError } from "./client";
export { authApi } from "./auth";
export { dashboardApi } from "./dashboard";
export type {
  LoginResponse,
  RegisterResponse,
  SessionResponse,
  OAuthUrlResponse,
  ConfirmEmailResponse,
} from "./auth";
export type {
  CategoryShares,
  SharesResponse,
  TopWebsite,
  TopWebsitesResponse,
} from "./dashboard";
