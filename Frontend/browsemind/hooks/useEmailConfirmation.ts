"use client";
/**
 * Hook for email confirmation operations.
 */
import { useState, useCallback } from "react";
import { authApi, ApiError } from "@/lib/api";

interface UseEmailConfirmationReturn {
  confirmEmail: (email: string, token: string) => Promise<ConfirmResult>;
  resendConfirmation: (email: string) => Promise<ResendResult>;
  isLoading: boolean;
}

interface ConfirmResult {
  success: boolean;
  message: string;
}

interface ResendResult {
  success: boolean;
  message: string;
}

export function useEmailConfirmation(): UseEmailConfirmationReturn {
  const [isLoading, setIsLoading] = useState(false);

  const confirmEmail = useCallback(
    async (email: string, token: string): Promise<ConfirmResult> => {
      setIsLoading(true);
      try {
        const data = await authApi.confirmEmail(email, token);
        return { success: data.success, message: data.message };
      } catch (error) {
        if (error instanceof ApiError) {
          return { success: false, message: error.message };
        }
        return { success: false, message: "Network error occurred" };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const resendConfirmation = useCallback(
    async (email: string): Promise<ResendResult> => {
      setIsLoading(true);
      try {
        const data = await authApi.resendConfirmation(email);
        return { success: data.success, message: data.message };
      } catch (error) {
        if (error instanceof ApiError) {
          return { success: false, message: error.message };
        }
        return { success: false, message: "Network error occurred" };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { confirmEmail, resendConfirmation, isLoading };
}
