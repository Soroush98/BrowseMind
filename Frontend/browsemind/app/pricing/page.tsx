import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Check, Shield } from "lucide-react"
import Header from "@/components/Header"

export default function Pricing() {
  const plans = [
    {
      name: "Free Trial",
      price: "0",
      period: "for 1 month",
      description: "Perfect for trying out BrowseMind",
      badge: "Most Popular",
      badgeVariant: "default" as const,
      features: [
        "1 month of full access",
        "Complete browsing history analysis",
        "Basic productivity insights",
        "Top websites tracking",
        "Time spent analytics",
        "Export basic reports",
      ],
      cta: "Start Free Trial",
      highlight: true,
    },
    {
      name: "Basic",
      price: "30",
      period: "per month",
      description: "Essential features for personal use",
      features: [
        "Unlimited browsing analysis",
        "Advanced productivity insights",
        "Custom time tracking",
        "Detailed reports & analytics",
        "Website categorization",
        "Email support",
        "Data export (CSV, PDF)",
      ],
      cta: "Get Started",
      highlight: false,
    },
    {
      name: "Pro",
      price: "60",
      period: "per month",
      description: "Advanced features for power users",
      badge: "Best Value",
      badgeVariant: "secondary" as const,
      features: [
        "Everything in Basic",
        "Real-time productivity alerts",
        "Advanced filtering & search",
        "Custom productivity goals",
        "Team collaboration features",
        "Priority support",
        "API access",
        "Advanced integrations",
      ],
      cta: "Upgrade to Pro",
      highlight: false,
    },
  ]

  return (
    <div className="relative flex min-h-screen flex-col bg-white">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="px-6 lg:px-40 py-16 lg:py-24">
            <div className="max-w-[960px] mx-auto text-center">
              <h1 className="text-[#111418] text-4xl lg:text-6xl font-black leading-tight tracking-[-0.033em] mb-6">
                Simple, transparent pricing
              </h1>
              <p className="text-[#637588] text-lg lg:text-xl leading-relaxed mb-8 max-w-3xl mx-auto">
                Start with a free month to explore all features. Then choose the plan that fits your needs. No hidden
                fees, cancel anytime.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-[#637588] mb-12">
                <Shield className="size-4" />
                <span>30-day money-back guarantee</span>
              </div>
            </div>
          </section>

          {/* Pricing Cards */}
          <section className="px-6 lg:px-40 py-8 lg:py-16">
            <div className="max-w-[1200px] mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan) => (
                  <Card
                    key={plan.name}
                    className={`relative group hover:shadow-xl transition-all duration-300 ${
                      plan.highlight
                        ? "border-[#1980e6] shadow-lg scale-105 bg-gradient-to-b from-white to-blue-50"
                        : "border-gray-200 shadow-md hover:border-[#1980e6]/30"
                    }`}
                  >
                    {plan.badge && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge
                          variant={plan.badgeVariant}
                          className={
                            plan.badgeVariant === "default"
                              ? "bg-[#1980e6] hover:bg-[#1570d1] text-white"
                              : "bg-green-100 text-green-800 hover:bg-green-200"
                          }
                        >
                          {plan.badge}
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-2xl font-bold text-[#111418] mb-2">{plan.name}</CardTitle>
                      <div className="mb-4">
                        <span className="text-4xl lg:text-5xl font-black text-[#111418]">${plan.price}</span>
                        <span className="text-[#637588] text-lg ml-2">{plan.period}</span>
                      </div>
                      <p className="text-[#637588] text-base">{plan.description}</p>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <Button
                        className={`w-full mb-6 ${
                          plan.highlight
                            ? "bg-[#1980e6] hover:bg-[#1570d1] text-white"
                            : "bg-gray-100 hover:bg-gray-200 text-[#111418]"
                        }`}
                        size="lg"
                      >
                        {plan.cta}
                      </Button>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-[#111418] text-sm uppercase tracking-wide">
                          What&apos;s included:
                        </h4>
                        <ul className="space-y-3">
                          {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start gap-3">
                              <Check className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-[#637588] text-sm leading-relaxed">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* How it Works */}
          <section className="px-6 lg:px-40 py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-[960px] mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-[#111418] text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em] mb-6">
                  How it works
                </h2>
                <p className="text-[#637588] text-lg leading-relaxed max-w-2xl mx-auto">
                  Get started in minutes and begin understanding your browsing habits immediately.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="size-16 bg-gradient-to-br from-[#1980e6] to-[#0066cc] rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-white text-2xl font-bold">1</span>
                  </div>
                  <h3 className="text-[#111418] text-xl font-bold mb-4">Start Free Trial</h3>
                  <p className="text-[#637588] leading-relaxed">
                    Sign up and get instant access to all features for one full month, completely free.
                  </p>
                </div>

                <div className="text-center">
                  <div className="size-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-white text-2xl font-bold">2</span>
                  </div>
                  <h3 className="text-[#111418] text-xl font-bold mb-4">Analyze Your Data</h3>
                  <p className="text-[#637588] leading-relaxed">
                    Connect your browsing history and let BrowseMind analyze your digital habits and patterns.
                  </p>
                </div>

                <div className="text-center">
                  <div className="size-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-white text-2xl font-bold">3</span>
                  </div>
                  <h3 className="text-[#111418] text-xl font-bold mb-4">Choose Your Plan</h3>
                  <p className="text-[#637588] leading-relaxed">
                    After your free month, seamlessly continue with the Basic plan or upgrade to Pro.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="px-6 lg:px-40 py-16 lg:py-24">
            <div className="max-w-[800px] mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-[#111418] text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em] mb-6">
                  Frequently asked questions
                </h2>
              </div>

              <div className="space-y-8">
                <div className="border-b border-[#f0f2f4] pb-6">
                  <h3 className="text-[#111418] text-lg font-bold mb-3">What happens after my free month ends?</h3>
                  <p className="text-[#637588] leading-relaxed">
                    After your free month, you&apos;ll automatically be enrolled in the Basic plan at $30/month. You can
                    upgrade, downgrade, or cancel at any time from your account settings.
                  </p>
                </div>

                <div className="border-b border-[#f0f2f4] pb-6">
                  <h3 className="text-[#111418] text-lg font-bold mb-3">Can I cancel anytime?</h3>
                  <p className="text-[#637588] leading-relaxed">
                    Yes, you can cancel your subscription at any time. You&apos;ll continue to have access to your plan
                    features until the end of your current billing period.
                  </p>
                </div>

                <div className="border-b border-[#f0f2f4] pb-6">
                  <h3 className="text-[#111418] text-lg font-bold mb-3">Is my browsing data secure?</h3>
                  <p className="text-[#637588] leading-relaxed">
                    Absolutely. We use enterprise-grade encryption and never share your personal browsing data. All
                    analysis is performed securely and your privacy is our top priority.
                  </p>
                </div>

                <div className="border-b border-[#f0f2f4] pb-6">
                  <h3 className="text-[#111418] text-lg font-bold mb-3">Do you offer refunds?</h3>
                  <p className="text-[#637588] leading-relaxed">
                    Yes, we offer a 30-day money-back guarantee on all paid plans. If you&apos;re not satisfied, contact our
                    support team for a full refund.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="px-6 lg:px-40 py-16 lg:py-24 bg-gradient-to-r from-[#1980e6] to-[#0066cc]">
            <div className="max-w-[960px] mx-auto text-center">
              <h2 className="text-white text-3xl lg:text-5xl font-black leading-tight tracking-[-0.033em] mb-6">
                Ready to start your free month?
              </h2>
              <p className="text-white/90 text-lg lg:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
                No credit card required. Get full access to all BrowseMind features for 30 days, completely free.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-[#1980e6] hover:bg-gray-100 text-lg px-8 py-4 h-auto"
              >
                Start Free Trial
              </Button>
            </div>
          </section>
        </main>

        <footer className="border-t border-[#f0f2f4] px-6 lg:px-40 py-8">
          <div className="max-w-[960px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="size-6 bg-gradient-to-br from-[#1980e6] to-[#0066cc] rounded flex items-center justify-center">
                <BarChart3 className="size-4 text-white" />
              </div>
              <span className="text-[#637588] text-sm">© 2025 BrowseMind. All rights reserved.</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-[#637588] text-sm hover:text-[#1980e6] transition-colors">
                Privacy
              </a>
              <a href="#" className="text-[#637588] text-sm hover:text-[#1980e6] transition-colors">
                Terms
              </a>
              <a href="#" className="text-[#637588] text-sm hover:text-[#1980e6] transition-colors">
                Support
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
