/**
 * Authentication API - all auth-related endpoints.
 */
import { apiClient, ApiError } from "./client";

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  redirect?: string;
  email?: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export interface SessionResponse {
  ok: boolean;
  email: string | null;
}

export interface OAuthUrlResponse {
  success: boolean;
  auth_url?: string;
}

export interface ConfirmEmailResponse {
  success: boolean;
  message: string;
}

export const authApi = {
  /**
   * Login with email and password.
   */
  login: (email: string, password: string): Promise<LoginResponse> =>
    apiClient.post<LoginResponse>("/api/login/", { email, password }),

  /**
   * Register a new account.
   */
  register: (email: string, password: string): Promise<RegisterResponse> =>
    apiClient.post<RegisterResponse>("/api/register/", { email, password }),

  /**
   * Check current session.
   */
  getSession: (): Promise<SessionResponse> =>
    apiClient.get<SessionResponse>("/api/session"),

  /**
   * Logout current user.
   */
  logout: (): Promise<{ success: boolean }> =>
    apiClient.post<{ success: boolean }>("/api/logout/"),

  /**
   * Get Google OAuth URL.
   */
  getGoogleAuthUrl: (): Promise<OAuthUrlResponse> =>
    apiClient.get<OAuthUrlResponse>("/api/google-auth-url/"),

  /**
   * Get Facebook OAuth URL.
   */
  getFacebookAuthUrl: (): Promise<OAuthUrlResponse> =>
    apiClient.get<OAuthUrlResponse>("/api/facebook-auth-url/"),

  /**
   * Confirm email with token.
   */
  confirmEmail: (email: string, token: string): Promise<ConfirmEmailResponse> =>
    apiClient.post<ConfirmEmailResponse>("/api/confirm-email/", { email, token }),

  /**
   * Resend confirmation email.
   */
  resendConfirmation: (email: string): Promise<ConfirmEmailResponse> =>
    apiClient.post<ConfirmEmailResponse>("/api/resend-confirmation/", { email }),
};

export { ApiError };
