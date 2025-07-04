"use client";
import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { DOMAIN } from "@/config";

function LoginContent() {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const error = searchParams.get('error');
    const message = searchParams.get('message');
    
    if (error) {
      const errorMessages: { [key: string]: string } = {
        'oauth_failed': message || 'OAuth authentication failed',
        'no_code': 'No authorization code received',
        'login_failed': message || 'Login failed',
        'request_failed': 'Request failed',
        'network_error': 'Network error occurred'
      };
      
      setErrorMessage(errorMessages[error] || 'An error occurred');
    }
  }, [searchParams]);
  return (
    <div className="relative flex min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Public Sans, Noto Sans, sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f4] px-10 py-3">
          <div className="flex items-center gap-4 text-[#111418]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em]">BrowseMind</h2>
          </div>
        </header>
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px]  py-5 max-w-[960px] flex-1">
            <h1 className="text-[#111418] tracking-light text-[32px] font-bold leading-tight px-4 text-left pb-3 pt-6">Sign in to your account</h1>
            
            {errorMessage && (
              <div className="mx-4 mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{errorMessage}</p>
              </div>
            )}
            
            <p
                className="text-[#637588] text-sm font-normal leading-normal pb-3 pt-1 px-4 underline cursor-pointer"
            >
                <Link href="/register">
                    Don&apos;t have an account? Register
                </Link>
            </p>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#111418] text-base font-medium leading-normal pb-2">Email address</p>
                <input
                  placeholder="Email address"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-14 placeholder:text-[#637588] p-[15px] text-base font-normal leading-normal"
                  defaultValue=""
                />
              </label>
            </div>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#111418] text-base font-medium leading-normal pb-2">Password</p>
                <input
                  placeholder="Password"
                  type="password"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-14 placeholder:text-[#637588] p-[15px] text-base font-normal leading-normal"
                  defaultValue=""
                />
              </label>
            </div>
            <div className="flex px-4 py-3 gap-2">
              <button
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 flex-1 bg-[#1980e6] text-white text-base font-bold leading-normal tracking-[0.015em]"
                onClick={async () => {
                  const email = (document.querySelector('input[placeholder="Email address"]') as HTMLInputElement)?.value;
                  const password = (document.querySelector('input[placeholder="Password"]') as HTMLInputElement)?.value;
                  const res = await fetch(DOMAIN + '/api/login/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ email, password }),
                  });                  if (res.ok) {
                    
                    window.location.href = '/dashboard';
                  } else {
                    const errorData = await res.json();
                    if (errorData.redirect === 'check-email') {
                      // User needs to confirm email
                      window.location.href = `/check-email?email=${encodeURIComponent(errorData.email)}`;
                    } else {
                      alert(errorData.message || 'Login failed');
                    }
                  }
                }}
              >
                <span className="truncate">Sign in</span>
              </button>
            </div>
            <p className="text-[#637588] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">or</p>            <div className="flex justify-stretch">
              <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-start">
                <button
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f4] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]"
                  onClick={async () => {
                    try {
                      // Get Google OAuth URL
                      const res = await fetch(DOMAIN + '/api/google-auth-url/', {
                        method: 'GET',
                        credentials: 'include',
                      });
                      if (res.ok) {
                        const data = await res.json();
                        if (data.success && data.auth_url) {
                          // Redirect to Google OAuth
                          window.location.href = data.auth_url;
                        } else {
                          alert('Failed to get Google auth URL');
                        }
                      } else {
                        alert('Failed to connect to Google');
                      }
                    } catch {
                      alert('Error connecting to Google');
                    }
                  }}
                >
                  <span className="truncate">Continue with Google</span>
                </button>                <button
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#1877f2] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                  onClick={async () => {
                    try {
                      // Get Facebook OAuth URL
                      const res = await fetch(DOMAIN + '/api/facebook-auth-url/', {
                        method: 'GET',
                        credentials: 'include',
                      });
                      if (res.ok) {
                        const data = await res.json();
                        if (data.success && data.auth_url) {
                          // Redirect to Facebook OAuth
                          window.location.href = data.auth_url;
                        } else {
                          alert('Failed to get Facebook auth URL');
                        }
                      } else {
                        alert('Failed to connect to Facebook');
                      }
                    } catch {
                      alert('Error connecting to Facebook');
                    }
                  }}
                >
                  <span className="truncate">Continue with Facebook</span>
                </button>
              </div>
            </div>
            <div className="flex px-4 py-3">
              <Link href="/">
                <button
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 flex-1 bg-[#f0f2f4] text-[#111418] text-base font-bold leading-normal tracking-[0.015em]"
                >
                  <span className="truncate">Back to Home</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="mb-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1980e6]"></div>
          </div>
          <p className="text-[#637588]">Loading...</p>
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
