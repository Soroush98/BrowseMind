import Link from "next/link";

export default function Privacy() {
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
                Privacy Policy
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
                  BrowseMind ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our web browsing analytics service.
                </p>
                <p className="text-base leading-relaxed">
                  By using BrowseMind, you consent to the data practices described in this Privacy Policy.
                </p>
              </section>

              {/* Information We Collect */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1980e6]">2. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold mb-3 text-[#111418]">Personal Information</h3>
                <p className="text-base leading-relaxed mb-4">
                  When you create an account, we collect:
                </p>
                <ul className="list-disc ml-6 space-y-2 text-base mb-6">
                  <li>Email address</li>
                  <li>Name (if provided)</li>
                  <li>Profile information from social media logins (Google, Facebook)</li>
                  <li>Account preferences and settings</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 text-[#111418]">Browsing Data</h3>
                <p className="text-base leading-relaxed mb-4">
                  Our browser extension collects:
                </p>
                <ul className="list-disc ml-6 space-y-2 text-base mb-6">
                  <li>Website URLs and domain names you visit</li>
                  <li>Time spent on each website</li>
                  <li>Browsing patterns and frequency</li>
                  <li>Website categories and productivity metrics</li>
                  <li>Browser and device information</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 text-[#111418]">Technical Information</h3>
                <ul className="list-disc ml-6 space-y-2 text-base">
                  <li>IP address and location data</li>
                  <li>Device type and operating system</li>
                  <li>Browser type and version</li>
                  <li>Usage analytics and performance data</li>
                </ul>
              </section>

              {/* How We Use Information */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1980e6]">3. How We Use Your Information</h2>
                <p className="text-base leading-relaxed mb-4">
                  We use the collected information to:
                </p>
                <ul className="list-disc ml-6 space-y-2 text-base">
                  <li>Provide personalized browsing insights and analytics</li>
                  <li>Generate productivity reports and recommendations</li>
                  <li>Improve our service functionality and user experience</li>
                  <li>Communicate with you about your account and service updates</li>
                  <li>Ensure security and prevent fraud</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              {/* Data Storage and Security */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1980e6]">4. Data Storage and Security</h2>
                <p className="text-base leading-relaxed mb-4">
                  We implement industry-standard security measures to protect your data:
                </p>
                <ul className="list-disc ml-6 space-y-2 text-base mb-6">
                  <li>Data encryption in transit and at rest</li>
                  <li>Secure AWS cloud infrastructure</li>
                  <li>Regular security audits and monitoring</li>
                  <li>Limited access controls and authentication</li>
                  <li>Secure JWT token-based authentication</li>
                </ul>
                <div className="bg-[#f0f2f4] p-4 rounded-lg">
                  <p className="text-base font-medium text-[#111418]">
                    🔒 Your browsing data is stored securely on AWS servers with enterprise-grade encryption.
                  </p>
                </div>
              </section>

              {/* Data Sharing */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1980e6]">5. Data Sharing and Disclosure</h2>
                <p className="text-base leading-relaxed mb-4">
                  We do not sell, trade, or rent your personal information. We may share data only in these limited circumstances:
                </p>
                <ul className="list-disc ml-6 space-y-2 text-base">
                  <li><strong>Service Providers:</strong> Third-party services that help us operate (AWS, analytics tools)</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                  <li><strong>Business Transfers:</strong> In case of merger, acquisition, or asset sale</li>
                  <li><strong>Consent:</strong> When you explicitly consent to sharing</li>
                </ul>
              </section>

              {/* Third-Party Services */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1980e6]">6. Third-Party Services</h2>
                <p className="text-base leading-relaxed mb-4">
                  Our service integrates with:
                </p>
                <ul className="list-disc ml-6 space-y-2 text-base">
                  <li><strong>Google OAuth:</strong> For secure authentication</li>
                  <li><strong>Facebook Login:</strong> For social media authentication</li>
                  <li><strong>AWS Services:</strong> For data storage and processing</li>
                  <li><strong>Analytics Tools:</strong> For service improvement</li>
                </ul>
                <p className="text-base leading-relaxed mt-4">
                  These services have their own privacy policies that govern their use of your information.
                </p>
              </section>

              {/* Your Rights */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1980e6]">7. Your Rights and Choices</h2>
                <p className="text-base leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc ml-6 space-y-2 text-base mb-6">
                  <li><strong>Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Update:</strong> Correct inaccurate or outdated information</li>
                  <li><strong>Delete:</strong> Request deletion of your account and data</li>
                  <li><strong>Opt-out:</strong> Disable data collection by uninstalling the extension</li>
                  <li><strong>Portability:</strong> Export your data in a structured format</li>
                </ul>
                <div className="bg-[#e8f4ff] p-4 rounded-lg border border-[#1980e6]">
                  <p className="text-base font-medium text-[#111418]">
                    💡 You can manage your privacy settings and data preferences in your account dashboard.
                  </p>
                </div>
              </section>

              {/* Cookies and Tracking */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1980e6]">8. Cookies and Tracking</h2>
                <p className="text-base leading-relaxed mb-4">
                  We use cookies and similar technologies to:
                </p>
                <ul className="list-disc ml-6 space-y-2 text-base">
                  <li>Maintain your login session</li>
                  <li>Remember your preferences</li>
                  <li>Analyze usage patterns</li>
                  <li>Improve service performance</li>
                </ul>
                <p className="text-base leading-relaxed mt-4">
                  You can control cookie settings through your browser preferences.
                </p>
              </section>

              {/* Data Retention */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1980e6]">9. Data Retention</h2>
                <p className="text-base leading-relaxed">
                  We retain your data for as long as your account is active or as needed to provide services. When you delete your account, we will remove your personal data within 30 days, except where required by law or legitimate business interests.
                </p>
              </section>

              {/* International Transfers */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1980e6]">10. International Data Transfers</h2>
                <p className="text-base leading-relaxed">
                  Your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with applicable privacy laws.
                </p>
              </section>

              {/* Children's Privacy */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1980e6]">11. Children's Privacy</h2>
                <p className="text-base leading-relaxed">
                  Our service is not intended for children under 13. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                </p>
              </section>

              {/* Policy Updates */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1980e6]">12. Changes to This Policy</h2>
                <p className="text-base leading-relaxed">
                  We may update this Privacy Policy periodically. We will notify you of significant changes via email or through our service. Your continued use after changes constitutes acceptance of the updated policy.
                </p>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1980e6]">13. Contact Us</h2>
                <p className="text-base leading-relaxed mb-4">
                  If you have questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-[#f0f2f4] p-6 rounded-lg">
                  <p className="text-base font-medium mb-2">📧 Email: browsemind.net@gmail.com</p>
                  <p className="text-base font-medium mb-2">🌐 Website: www.browsemind.net</p>
                  <p className="text-base font-medium">📍 Subject Line: Privacy Policy Inquiry</p>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}