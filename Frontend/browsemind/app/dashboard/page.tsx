import React from "react";

export default function Dashboard() {
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
                  d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em]">Web Habit</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <a className="text-[#111418] text-sm font-medium leading-normal" href="#">Dashboard</a>
              <a className="text-[#111418] text-sm font-medium leading-normal" href="#">Reports</a>
              <a className="text-[#111418] text-sm font-medium leading-normal" href="#">Goals</a>
              <a className="text-[#111418] text-sm font-medium leading-normal" href="#">Explore</a>
            </div>
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#1980e6] text-white text-sm font-bold leading-normal tracking-[0.015em]"
            >
              <span className="truncate">New Report</span>
            </button>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/6cef6c51-7525-403c-b377-d382a8c24891.png")' }}
            ></div>
          </div>
        </header>
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#111418] text-4xl font-black leading-tight tracking-[-0.033em]">Good evening, Alex</p>
                <p className="text-[#637588] text-base font-normal leading-normal">Here&apos;s your activity summary for the past week</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 p-4">
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dce0e5]">
                <p className="text-[#111418] text-base font-medium leading-normal">Total time</p>
                <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">20h 15m</p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dce0e5]">
                <p className="text-[#111418] text-base font-medium leading-normal">Productivity</p>
                <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">75%</p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dce0e5]">
                <p className="text-[#111418] text-base font-medium leading-normal">Focus</p>
                <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">85%</p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#dce0e5]">
                <p className="text-[#111418] text-base font-medium leading-normal">Distracted</p>
                <p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">15%</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 px-4 py-6">
              <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-xl border border-[#dce0e5] p-6">
                <p className="text-[#111418] text-base font-medium leading-normal">Sites visited</p>
                <div className="grid min-h-[180px] gap-x-4 gap-y-6 grid-cols-[auto_1fr] items-center py-3">
                  <p className="text-[#637588] text-[13px] font-bold leading-normal tracking-[0.015em]">Social Media</p>
                  <div className="h-full flex-1"><div className="border-[#637588] bg-[#f0f2f4] border-r-2 h-full" style={{ width: '50%' }}></div></div>
                  <p className="text-[#637588] text-[13px] font-bold leading-normal tracking-[0.015em]">Entertainment</p>
                  <div className="h-full flex-1"><div className="border-[#637588] bg-[#f0f2f4] border-r-2 h-full" style={{ width: '70%' }}></div></div>
                  <p className="text-[#637588] text-[13px] font-bold leading-normal tracking-[0.015em]">News</p>
                  <div className="h-full flex-1"><div className="border-[#637588] bg-[#f0f2f4] border-r-2 h-full" style={{ width: '50%' }}></div></div>
                  <p className="text-[#637588] text-[13px] font-bold leading-normal tracking-[0.015em]">Shopping</p>
                  <div className="h-full flex-1"><div className="border-[#637588] bg-[#f0f2f4] border-r-2 h-full" style={{ width: '30%' }}></div></div>
                  <p className="text-[#637588] text-[13px] font-bold leading-normal tracking-[0.015em]">Learning</p>
                  <div className="h-full flex-1"><div className="border-[#637588] bg-[#f0f2f4] border-r-2 h-full" style={{ width: '80%' }}></div></div>
                  <p className="text-[#637588] text-[13px] font-bold leading-normal tracking-[0.015em]">Work</p>
                  <div className="h-full flex-1"><div className="border-[#637588] bg-[#f0f2f4] border-r-2 h-full" style={{ width: '60%' }}></div></div>
                </div>
              </div>
            </div>
            <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Top sites</h3>
            <div className="px-4 py-3">
              <div className="flex overflow-hidden rounded-xl border border-[#dce0e5] bg-white">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-white">
                      <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">Site</th>
                      <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">Time</th>
                      <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">Visits</th>
                      <th className="px-4 py-3 text-left text-[#111418] w-60 text-sm font-medium leading-normal">Productive</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Example rows, replace with dynamic data as needed */}
                    <tr className="border-t border-t-[#dce0e5]">
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#111418] text-sm font-normal leading-normal">Twitter.com</td>
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">2h 15m</td>
                      <td className="h-[72px] px-4 py-2 w-[400px] text-[#637588] text-sm font-normal leading-normal">5</td>
                      <td className="h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#f0f2f4] text-[#111418] text-sm font-medium leading-normal w-full">
                          <span className="truncate">No</span>
                        </button>
                      </td>
                    </tr>
                    {/* ...other rows... */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <footer className="flex justify-center">
          <div className="flex max-w-[960px] flex-1 flex-col">
            <footer className="flex flex-col gap-6 px-5 py-10 text-center">
              <div className="flex flex-wrap items-center justify-center gap-6">
                <a className="text-[#637588] text-base font-normal leading-normal min-w-40" href="#">About</a>
                <a className="text-[#637588] text-base font-normal leading-normal min-w-40" href="#">Pricing</a>
                <a className="text-[#637588] text-base font-normal leading-normal min-w-40" href="#">Help</a>
                <a className="text-[#637588] text-base font-normal leading-normal min-w-40" href="#">Docs</a>
                <a className="text-[#637588] text-base font-normal leading-normal min-w-40" href="#">API</a>
                <a className="text-[#637588] text-base font-normal leading-normal min-w-40" href="#">Jobs</a>
                <a className="text-[#637588] text-base font-normal leading-normal min-w-40" href="#">Privacy</a>
                <a className="text-[#637588] text-base font-normal leading-normal min-w-40" href="#">Terms</a>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#">
                  <div className="text-[#637588]">
                    {/* Twitter SVG */}
                  </div>
                </a>
                <a href="#">
                  <div className="text-[#637588]">
                    {/* Github SVG */}
                  </div>
                </a>
                <a href="#">
                  <div className="text-[#637588]">
                    {/* Linkedin SVG */}
                  </div>
                </a>
              </div>
              <p className="text-[#637588] text-base font-normal leading-normal">@2023 Web Habit Inc.</p>
            </footer>
          </div>
        </footer>
      </div>
    </div>
  );
}
