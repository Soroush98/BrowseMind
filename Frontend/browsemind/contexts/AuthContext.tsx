"use client";
/**
 * Authentication Context - global auth state management.
 */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { authApi, ApiError } from "@/lib/api";

interface AuthContextType {
  user: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<LoginResult>;
  register: (email: string, password: string) => Promise<RegisterResult>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
}

interface LoginResult {
  success: boolean;
  redirect?: string;
  email?: string;
  message?: string;
}

interface RegisterResult {
  success: boolean;
  message?: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const data = await authApi.getSession();
        if (data.ok && data.email) {
          setUser(data.email);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<LoginResult> => {
      try {
        const data = await authApi.login(email, password);
        if (data.success) {
          setUser(email);
          return { success: true };
        }
        return { success: false, message: data.message };
      } catch (error) {
        if (error instanceof ApiError) {
          return {
            success: false,
            redirect: error.data?.redirect as string | undefined,
            email: error.data?.email as string | undefined,
            message: error.message,
          };
        }
        return { success: false, message: "Network error" };
      }
    },
    []
  );

  const register = useCallback(
    async (email: string, password: string): Promise<RegisterResult> => {
      try {
        const data = await authApi.register(email, password);
        return { success: data.success, message: data.message };
      } catch (error) {
        if (error instanceof ApiError) {
          return { success: false, message: error.message };
        }
        return { success: false, message: "Network error" };
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      setUser(null);
      router.push("/");
    }
  }, [router]);

  const loginWithGoogle = useCallback(async () => {
    try {
      const data = await authApi.getGoogleAuthUrl();
      if (data.success && data.auth_url) {
        window.location.href = data.auth_url;
      } else {
        throw new Error("Failed to get Google auth URL");
      }
    } catch (error) {
      throw error;
    }
  }, []);

  const loginWithFacebook = useCallback(async () => {
    try {
      const data = await authApi.getFacebookAuthUrl();
      if (data.success && data.auth_url) {
        window.location.href = data.auth_url;
      } else {
        throw new Error("Failed to get Facebook auth URL");
      }
    } catch (error) {
      throw error;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        loginWithGoogle,
        loginWithFacebook,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
