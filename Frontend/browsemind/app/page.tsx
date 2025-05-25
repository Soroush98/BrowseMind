import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-white group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f4] px-10 py-3">
          <div className="flex items-center gap-4 text-[#111418]">
            <div className="size-4">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em]">
              BrowseMind
            </h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <a
                className="text-[#111418] text-sm font-medium leading-normal"
                href="#"
              >
                Home
              </a>
              <a
                className="text-[#111418] text-sm font-medium leading-normal"
                href="#"
              >
                Features
              </a>
              <a
                className="text-[#111418] text-sm font-medium leading-normal"
                href="#"
              >
                Pricing
              </a>
              <a
                className="text-[#111418] text-sm font-medium leading-normal"
                href="#"
              >
                API
              </a>
            </div>
            <div className="flex gap-2">
            <Link href="/register">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#1980e6] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Sign up</span>
              </button>
            </Link>
              <Link href="/login">
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f4] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]">
                  <span className="truncate">Log in</span>
                </button>
              </Link>
              <Link href="/dashboard">
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#4F81BD] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                  <span className="truncate">Dashboard</span>
                </button>
              </Link>
            </div>
          </div>
        </header>
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="@container">
              <div className="@[480px]:p-4">
                <div
                  className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-start justify-end px-4 pb-10 @[480px]:px-10"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://cdn.usegalileo.ai/sdxl10/8cc06c04-1df8-4fc0-956f-6078870bcbdb.png")',
                  }}
                >
                  <div className="flex flex-col gap-2 text-left">
                    <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                      Uncover insights from your web browsing history
                    </h1>
                    <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                      BrowseMind helps you understand how you spend time online by
                      analyzing your web browsing history. Sign up to get started.
                    </h2>
                  </div>
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#1980e6] text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
                    <span className="truncate">Get started</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-10 px-4 py-10 @container">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <h1 className="text-[#111418] tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
                    Understand your habits
                  </h1>
                  <p className="text-[#111418] text-base font-normal leading-normal max-w-[720px]">
                    Get a summary of your browsing activity, including the
                    percentage of time spent in each category and a list of your
                    most visited sites.
                  </p>
                </div>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#1980e6] text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] w-fit">
                  <span className="truncate">Get started</span>
                </button>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
                <div className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                    style={{
                      backgroundImage:
                        'url("https://cdn.usegalileo.ai/sdxl10/7493a5fd-565a-4855-a2da-50fde52374a3.png")',
                    }}
                  ></div>
                  <div>
                    <p className="text-[#111418] text-base font-medium leading-normal">
                      View your browsing history
                    </p>
                    <p className="text-[#637588] text-sm font-normal leading-normal">
                      Get a summary of your browsing activity, including the
                      percentage of time spent in each category and a list of your
                      most visited sites.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                    style={{
                      backgroundImage:
                        'url("https://cdn.usegalileo.ai/sdxl10/3fc901a1-e93c-4427-b0f2-b7492791fa84.png")',
                    }}
                  ></div>
                  <div>
                    <p className="text-[#111418] text-base font-medium leading-normal">
                      Analyze your browsing activity
                    </p>
                    <p className="text-[#637588] text-sm font-normal leading-normal">
                      Get a summary of your browsing activity, including the
                      percentage of time spent in each category and a list of your
                      most visited sites.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                    style={{
                      backgroundImage:
                        'url("https://cdn.usegalileo.ai/sdxl10/080ffbbd-6049-4675-97d3-24122309ed3a.png")',
                    }}
                  ></div>
                  <div>
                    <p className="text-[#111418] text-base font-medium leading-normal">
                      See your most visited sites
                    </p>
                    <p className="text-[#637588] text-sm font-normal leading-normal">
                      BrowseMind helps you understand how you spend time online by
                      analyzing your web browsing history. Sign up to get started.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                    style={{
                      backgroundImage:
                        'url("https://cdn.usegalileo.ai/sdxl10/fa06276a-7cf2-42cf-b671-60846daf462c.png")',
                    }}
                  ></div>
                  <div>
                    <p className="text-[#111418] text-base font-medium leading-normal">
                      Understand how you spend time online
                    </p>
                    <p className="text-[#637588] text-sm font-normal leading-normal">
                      BrowseMind helps you understand how you spend time online by
                      analyzing your web browsing history. Sign up to get started.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
