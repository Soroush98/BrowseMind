import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Clock,
  Globe,
  TrendingUp,
  Shield,
  Zap,
  Target,
  Filter,
  Download,
  Bell,
  Users,
  Search,
  PieChart,
  Activity,
  Settings,
} from "lucide-react"

export default function Features() {
  const mainFeatures = [
    {
      icon: Clock,
      title: "Time Tracking & Analytics",
      description: "Monitor exactly how much time you spend on different websites and categories",
      features: [
        "Real-time time tracking",
        "Daily, weekly, monthly reports",
        "Category-based analysis",
        "Productivity scoring",
        "Time comparison charts",
      ],
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: TrendingUp,
      title: "Browsing Pattern Analysis",
      description: "Discover trends and patterns in your browsing behavior over time",
      features: [
        "Trend identification",
        "Peak usage hours",
        "Behavioral insights",
        "Habit formation tracking",
        "Pattern predictions",
      ],
      color: "from-green-500 to-green-600",
    },
    {
      icon: Globe,
      title: "Website Categorization",
      description: "Automatically categorize websites into productivity, entertainment, social, and more",
      features: [
        "Smart auto-categorization",
        "Custom category creation",
        "Productivity vs distraction analysis",
        "Category time allocation",
        "Goal setting per category",
      ],
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: PieChart,
      title: "Visual Reports & Dashboards",
      description: "Beautiful, interactive charts and graphs to visualize your browsing data",
      features: [
        "Interactive dashboards",
        "Customizable charts",
        "Export capabilities",
        "Shareable reports",
        "Mobile-optimized views",
      ],
      color: "from-orange-500 to-orange-600",
    },
  ]

  const advancedFeatures = [
    {
      icon: Target,
      title: "Productivity Goals",
      description: "Set and track productivity goals with smart recommendations",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Get notified when you exceed time limits on distracting sites",
    },
    {
      icon: Filter,
      title: "Advanced Filtering",
      description: "Filter and search through your browsing history with powerful tools",
    },
    {
      icon: Download,
      title: "Data Export",
      description: "Export your data in multiple formats (CSV, PDF, JSON)",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share insights and collaborate with team members (Pro plan)",
    },
    {
      icon: Settings,
      title: "Custom Integrations",
      description: "Connect with your favorite productivity tools and apps",
    },
  ]

  return (
    <div className="relative flex min-h-screen flex-col bg-white">
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f4] px-6 lg:px-10 py-4">
          <Link href="/" className="flex items-center gap-3 text-[#111418]">
            <div className="size-8 bg-gradient-to-br from-[#1980e6] to-[#0066cc] rounded-lg flex items-center justify-center">
              <BarChart3 className="size-5 text-white" />
            </div>
            <h2 className="text-[#111418] text-xl font-bold leading-tight tracking-[-0.015em]">BrowseMind</h2>
          </Link>
          <div className="flex flex-1 justify-end gap-8">
            <nav className="hidden md:flex items-center gap-8">
              <Link
                className="text-[#111418] text-sm font-medium leading-normal hover:text-[#1980e6] transition-colors"
                href="/"
              >
                Home
              </Link>
              <a className="text-[#1980e6] text-sm font-medium leading-normal" href="#">
                Features
              </a>
              <Link
                className="text-[#111418] text-sm font-medium leading-normal hover:text-[#1980e6] transition-colors"
                href="/pricing"
              >
                Pricing
              </Link>
              <Link
                className="text-[#111418] text-sm font-medium leading-normal hover:text-[#1980e6] transition-colors"
                href="/api"
              >
                API
              </Link>
            </nav>
            <div className="flex gap-3">
              <Link href="/login">
                <Button variant="ghost" className="text-[#111418] hover:bg-[#f0f2f4]">
                  Log in
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-[#1980e6] hover:bg-[#1570d1] text-white">Sign up</Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero Section */}
          <section className="px-6 lg:px-40 py-16 lg:py-24">
            <div className="max-w-[960px] mx-auto text-center">
              <Badge className="bg-[#1980e6] hover:bg-[#1570d1] text-white mb-6">Powerful Analytics</Badge>
              <h1 className="text-[#111418] text-4xl lg:text-6xl font-black leading-tight tracking-[-0.033em] mb-6">
                Every feature you need to understand your browsing habits
              </h1>
              <p className="text-[#637588] text-lg lg:text-xl leading-relaxed mb-8 max-w-3xl mx-auto">
                From basic time tracking to advanced behavioral analysis, BrowseMind provides comprehensive insights
                into your digital life with enterprise-grade security and privacy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-[#1980e6] hover:bg-[#1570d1] text-white">
                  Start Free Trial
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#1980e6] text-[#1980e6] hover:bg-[#1980e6] hover:text-white"
                >
                  View Demo
                </Button>
              </div>
            </div>
          </section>

          {/* Main Features */}
          <section className="px-6 lg:px-40 py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-[1200px] mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-[#111418] text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em] mb-6">
                  Core Features
                </h2>
                <p className="text-[#637588] text-lg leading-relaxed max-w-2xl mx-auto">
                  Everything you need to gain deep insights into your browsing behavior and improve your digital
                  productivity.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {mainFeatures.map((feature, index) => (
                  <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                    <CardHeader className="pb-4">
                      <div
                        className={`size-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4`}
                      >
                        <feature.icon className="size-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl font-bold text-[#111418] mb-3">{feature.title}</CardTitle>
                      <p className="text-[#637588] text-base leading-relaxed">{feature.description}</p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="space-y-3">
                        {feature.features.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-center gap-3">
                            <div className="size-2 bg-[#1980e6] rounded-full flex-shrink-0"></div>
                            <span className="text-[#637588] text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Advanced Features Grid */}
          <section className="px-6 lg:px-40 py-16 lg:py-24">
            <div className="max-w-[1200px] mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-[#111418] text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em] mb-6">
                  Advanced Capabilities
                </h2>
                <p className="text-[#637588] text-lg leading-relaxed max-w-2xl mx-auto">
                  Take your browsing analysis to the next level with these powerful features.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {advancedFeatures.map((feature, index) => (
                  <Card
                    key={index}
                    className="group hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-[#1980e6]/30"
                  >
                    <CardContent className="p-6">
                      <div className="size-12 bg-[#1980e6]/10 rounded-lg flex items-center justify-center mb-4">
                        <feature.icon className="size-6 text-[#1980e6]" />
                      </div>
                      <h3 className="text-[#111418] text-lg font-bold mb-3">{feature.title}</h3>
                      <p className="text-[#637588] text-sm leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Security & Privacy */}
          <section className="px-6 lg:px-40 py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-[960px] mx-auto">
              <div className="text-center mb-16">
                <div className="size-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="size-10 text-white" />
                </div>
                <h2 className="text-[#111418] text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em] mb-6">
                  Security & Privacy First
                </h2>
                <p className="text-[#637588] text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                  Your browsing data is sensitive. We use enterprise-grade security measures to protect your privacy and
                  ensure your data remains completely secure.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="size-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="size-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-[#111418] font-bold mb-2">End-to-End Encryption</h3>
                      <p className="text-[#637588] text-sm">
                        All data is encrypted in transit and at rest using AES-256 encryption.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="size-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap className="size-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-[#111418] font-bold mb-2">Local Processing</h3>
                      <p className="text-[#637588] text-sm">
                        Analysis happens locally when possible, minimizing data transmission.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="size-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="size-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-[#111418] font-bold mb-2">No Data Sharing</h3>
                      <p className="text-[#637588] text-sm">
                        We never share, sell, or monetize your personal browsing data.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="size-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Settings className="size-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-[#111418] font-bold mb-2">Full Control</h3>
                      <p className="text-[#637588] text-sm">
                        You own your data and can export or delete it at any time.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="size-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Activity className="size-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-[#111418] font-bold mb-2">GDPR Compliant</h3>
                      <p className="text-[#637588] text-sm">
                        Fully compliant with GDPR, CCPA, and other privacy regulations.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="size-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Search className="size-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-[#111418] font-bold mb-2">Transparent Practices</h3>
                      <p className="text-[#637588] text-sm">
                        Clear privacy policy with no hidden data collection practices.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="px-6 lg:px-40 py-16 lg:py-24 bg-gradient-to-r from-[#1980e6] to-[#0066cc]">
            <div className="max-w-[960px] mx-auto text-center">
              <h2 className="text-white text-3xl lg:text-5xl font-black leading-tight tracking-[-0.033em] mb-6">
                Ready to explore all features?
              </h2>
              <p className="text-white/90 text-lg lg:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
                Start your free trial today and discover how BrowseMind can transform your understanding of your digital
                habits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-[#1980e6] hover:bg-gray-100 text-lg px-8 py-4 h-auto"
                >
                  Start Free Trial
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#1980e6] text-lg px-8 py-4 h-auto"
                >
                  View Pricing
                </Button>
              </div>
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
