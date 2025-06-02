"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Mail, Loader } from "lucide-react";
import { DOMAIN } from "@/config";

export default function CheckEmail() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState('');

  const handleResendEmail = async () => {
    if (!email) return;
    
    setIsResending(true);
    setMessage('');

    try {
      const res = await fetch(DOMAIN + '/api/resend-confirmation/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      
      if (data.success) {
        setMessage('Confirmation email sent successfully!');
      } else {
        setMessage(data.message || 'Failed to resend email');
      }
    } catch (error) {
      setMessage('Network error occurred');
    } finally {
      setIsResending(false);
    }
  };

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
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="bg-blue-100 p-4 rounded-full">
                  <Mail className="size-12 text-[#1980e6]" />
                </div>
              </div>
              
              <h1 className="text-2xl font-bold text-[#111418]">Check your email</h1>
              
              <div className="space-y-3">
                <p className="text-[#637588]">
                  We've sent a confirmation link to:
                </p>
                {email && (
                  <p className="font-medium text-[#111418] bg-[#f0f2f4] px-4 py-2 rounded-xl">
                    {email}
                  </p>
                )}
                <p className="text-[#637588] text-sm">
                  Please check your email and click the confirmation link to complete your registration.
                  The link will expire in 24 hours.
                </p>
              </div>

              <div className="space-y-3 pt-6">                <p className="text-sm text-[#637588]">
                  Didn't receive the email? Check your spam folder or resend the confirmation.
                </p>
                
                {message && (
                  <div className={`p-3 rounded-xl text-sm ${
                    message.includes('successfully') 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {message}
                  </div>
                )}
                
                <div className="space-y-2">
                  <button
                    onClick={handleResendEmail}
                    disabled={isResending || !email}
                    className="bg-[#1980e6] hover:bg-[#1570d1] disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-medium w-full flex items-center justify-center gap-2"
                  >
                    {isResending ? (
                      <>
                        <Loader className="size-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Resend Email'
                    )}
                  </button>
                  
                  <Link href="/login">
                    <button className="bg-[#f0f2f4] hover:bg-[#e8eaed] text-[#111418] px-6 py-3 rounded-xl font-medium w-full">
                      Back to Login
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}