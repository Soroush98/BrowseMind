"use client";
import { useEffect, Suspense} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DOMAIN } from "@/config";

function FacebookCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const error = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');
      const state = searchParams.get('state');

      if (error) {
        console.error('Facebook OAuth error:', error, errorDescription);
        const errorMessage = errorDescription || error;
        router.push(`/login?error=oauth_failed&message=${encodeURIComponent(errorMessage)}`);
        return;
      }

      if (!code) {
        console.error('No authorization code received');
        router.push('/login?error=no_code');
        return;
      }

      try {
        // Send the authorization code to backend
        const res = await fetch(DOMAIN + '/api/facebook-login/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ code, state }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          // Successful login, redirect to dashboard
          router.push('/dashboard');
        } else {
          console.error('Login failed:', data.message);
          router.push(`/login?error=login_failed&message=${encodeURIComponent(data.message || 'Login failed')}`);
        }
      } catch (error) {
        console.error('Error during login:', error);
        router.push('/login?error=network_error');
      }
    };

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="text-center">
        <div className="mb-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1980e6]"></div>
        </div>
        <p className="text-[#637588]">Completing sign in with Facebook...</p>
      </div>
    </div>
    );
}
export default function FacebookCallback() {
    return (
        <Suspense fallback={
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="text-center">
        <div className="mb-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1980e6]"></div>
        </div>
        <p className="text-[#637588]">Completing sign in with Facebook...</p>
      </div>
    </div>
    }>
    <FacebookCallbackContent />
    </Suspense>
    );
}