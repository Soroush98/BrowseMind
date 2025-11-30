"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, XCircle, Loader } from "lucide-react";
import { useEmailConfirmation } from "@/hooks/useEmailConfirmation";

function ConfirmEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { confirmEmail } = useEmailConfirmation();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleConfirmEmail = async () => {
      const token = searchParams.get("token");
      const email = searchParams.get("email");

      if (!token || !email) {
        setStatus("error");
        setMessage("Invalid confirmation link");
        return;
      }

      const result = await confirmEmail(email, token);

      if (result.success) {
        setStatus("success");
        setMessage(result.message);
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push("/login?confirmed=true");
        }, 3000);
      } else {
        setStatus("error");
        setMessage(result.message);
      }
    };

    handleConfirmEmail();
  }, [router, searchParams, confirmEmail]);

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

        <div className="flex flex-1 justify-center py-20">
          <div className="max-w-md w-full px-4">
            <div className="text-center">
              {status === 'loading' && (
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <Loader className="size-16 text-[#1980e6] animate-spin" />
                  </div>
                  <h1 className="text-2xl font-bold text-[#111418]">Confirming your email...</h1>
                  <p className="text-[#637588]">Please wait while we verify your email address.</p>
                </div>
              )}

              {status === 'success' && (
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <CheckCircle className="size-16 text-green-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-[#111418]">Email Confirmed!</h1>
                  <p className="text-[#637588]">{message}</p>
                  <p className="text-sm text-[#637588]">Redirecting you to login...</p>
                  <div className="mt-6">
                    <button
                      onClick={() => router.push('/login')}
                      className="bg-[#1980e6] hover:bg-[#1570d1] text-white px-6 py-3 rounded-xl font-medium"
                    >
                      Go to Login
                    </button>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <XCircle className="size-16 text-red-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-[#111418]">Confirmation Failed</h1>
                  <p className="text-[#637588]">{message}</p>
                  <div className="space-y-3">
                    <button
                      onClick={() => router.push('/register')}
                      className="bg-[#1980e6] hover:bg-[#1570d1] text-white px-6 py-3 rounded-xl font-medium block w-full"
                    >
                      Register Again
                    </button>
                    <button
                      onClick={() => router.push('/login')}
                      className="bg-[#f0f2f4] hover:bg-[#e8eaed] text-[#111418] px-6 py-3 rounded-xl font-medium block w-full"
                    >
                      Back to Login
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmEmail() {
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
      <ConfirmEmailContent />
    </Suspense>
  );
}