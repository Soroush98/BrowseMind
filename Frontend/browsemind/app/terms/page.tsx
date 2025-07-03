import Link from "next/link";

export default function Terms() {
  return (
    <div className="relative flex min-h-screen flex-col bg-white">
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
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
          <div className="flex items-center gap-4">
            <Link href="/" className="text-[#111418] text-sm font-medium hover:text-[#1980e6] transition-colors">
              Home
            </Link>
            <Link href="/login" className="text-[#111418] text-sm font-medium hover:text-[#1980e6] transition-colors">
              Login
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-6 lg:px-40 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-[#111418] text-4xl font-bold leading-tight tracking-[-0.033em] mb-4">
                Terms of Service
              </h1>
              <p className="text-[#637588] text-lg">
                Last updated: July 3, 2025
              </p>
            </div>

            <div className="space-y-8 text-[#111418]">
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1980e6]">1. Introduction</h2>
                <p className="text-base leading-relaxed mb-4">
                  Welcome to BrowseMind ("we," "our," or "us"). These Terms of Service ("Terms") govern your use of our web browsing analytics service, including our website, browser extension, and related services (collectively, the "Service").
                </p>
                <p className="text-base leading-relaxed">
                  By accessing or using BrowseMind, you agree to be bound by these Terms. If you disagree with any part of these terms, you may not access the Service.
                </p>
              </section>

              {/* Service Description */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1980e6]">2. Service Description</h2>
                <p className="text-base leading-relaxed mb-4">
                  BrowseMind provides web browsing analytics and insights to help you understand your online habits. Our services include:
                </p>
                <ul className="list-disc ml-6 space-y-2 text-base">
                  <li>Analysis of your web browsing patterns and productivity metrics</li>
                  <li>Personalized insights and recommendations for digital wellness</li>
                  <li>Time tracking and category-based website analysis</li>
                  <li>Dashboard and reporting tools for browsing behavior</li>
                </ul>
              </section>

              {/* User Accounts */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1980e6]">3. User Accounts</h2>
                <p className="text-base leading-relaxed mb-4">
                  To use our Service, you must create an account. You agree to:
                </p>
                <ul className="list-disc ml-6 space-y-2 text-base">
                  <li>Provide accurate and complete information</li>
                  <li>Keep your account information updated</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use</li>
                </ul>
              </section>

              {/* Data Collection */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1980e6]">4. Data Collection and Use</h2>
                <p className="text-base leading-relaxed mb-4">
                  Our browser extension collects browsing data to provide analytics services. By using BrowseMind, you consent to:
                </p>
                <ul className="list-disc ml-6 space-y-2 text-base">
                  <li>Collection of website URLs, visit duration, and browsing patterns</li>
                  <li>Analysis of your browsing data for productivity insights</li>
                  <li>Storage of anonymized data for service improvement</li>
                  <li>Use of data as described in our Privacy Policy</li>
                </ul>
              </section>

              {/* Acceptable Use */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1980e6]">5. Acceptable Use</h2>
                <p className="text-base leading-relaxed mb-4">
                  You agree not to use the Service to:
                </p>
                <ul className="list-disc ml-6 space-y-2 text-base">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Transmit malicious code or interfere with the Service</li>
                  <li>Attempt to reverse engineer or hack our systems</li>
                  <li>Share your account or use it for commercial purposes without permission</li>
                </ul>
              </section>

              {/* Privacy */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1980e6]">6. Privacy</h2>
                <p className="text-base leading-relaxed">
                  Your privacy is important to us. Please review our{" "}
                  <Link href="/privacy" className="text-[#1980e6] hover:underline font-medium">
                    Privacy Policy
                  </Link>
                  , which explains how we collect, use, and protect your information.
                </p>
              </section>

              {/* Intellectual Property */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1980e6]">7. Intellectual Property</h2>
                <p className="text-base leading-relaxed">
                  The Service and its original content, features, and functionality are owned by BrowseMind and are protected by international copyright, trademark, and other intellectual property laws.
                </p>
              </section>

              {/* Termination */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1980e6]">8. Termination</h2>
                <p className="text-base leading-relaxed">
                  We may terminate or suspend your account and access to the Service immediately, without prior notice, if you breach these Terms. You may also terminate your account at any time through your account settings.
                </p>
              </section>

              {/* Disclaimers */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1980e6]">9. Disclaimers</h2>
                <p className="text-base leading-relaxed">
                  The Service is provided "as is" without warranties of any kind. We disclaim all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement.
                </p>
              </section>

              {/* Limitation of Liability */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1980e6]">10. Limitation of Liability</h2>
                <p className="text-base leading-relaxed">
                  BrowseMind shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or other intangible losses.
                </p>
              </section>

              {/* Changes to Terms */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1980e6]">11. Changes to Terms</h2>
                <p className="text-base leading-relaxed">
                  We reserve the right to modify these Terms at any time. We will notify users of significant changes via email or through the Service. Continued use after changes constitutes acceptance of the new Terms.
                </p>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1980e6]">12. Contact Information</h2>
                <p className="text-base leading-relaxed">
                  If you have any questions about these Terms, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-[#f0f2f4] rounded-lg">
                  <p className="text-base font-medium">Email: browsemind.net@gmail.com</p>
                  <p className="text-base font-medium">Website: www.browsemind.net</p>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}