import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Code,
  Zap,
  Shield,
  Globe,
  Database,
  Key,
  Clock,
  TrendingUp,
  Download,
  Webhook,
  Settings,
} from "lucide-react"

export default function API() {
  const endpoints = [
    {
      method: "GET",
      endpoint: "/api/v1/browsing-data",
      description: "Retrieve browsing history data with filtering options",
      params: ["date_range", "category", "limit"],
    },
    {
      method: "GET",
      endpoint: "/api/v1/analytics/time-spent",
      description: "Get time spent analytics by category or website",
      params: ["period", "group_by", "category"],
    },
    {
      method: "GET",
      endpoint: "/api/v1/analytics/top-sites",
      description: "Retrieve most visited websites with statistics",
      params: ["limit", "period", "sort_by"],
    },
    {
      method: "POST",
      endpoint: "/api/v1/goals",
      description: "Create or update productivity goals",
      params: ["category", "time_limit", "alert_enabled"],
    },
  ]

  const features = [
    {
      icon: Zap,
      title: "Real-time Data",
      description: "Access your browsing data in real-time with low latency responses",
    },
    {
      icon: Shield,
      title: "Secure Authentication",
      description: "OAuth 2.0 and API key authentication with rate limiting",
    },
    {
      icon: Database,
      title: "Rich Data Format",
      description: "JSON responses with comprehensive metadata and filtering options",
    },
    {
      icon: Globe,
      title: "RESTful Design",
      description: "Clean, predictable REST API following industry best practices",
    },
    {
      icon: Webhook,
      title: "Webhooks Support",
      description: "Real-time notifications for goal achievements and alerts",
    },
    {
      icon: Settings,
      title: "Flexible Integration",
      description: "Easy integration with popular tools and custom applications",
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
              <Link
                className="text-[#111418] text-sm font-medium leading-normal hover:text-[#1980e6] transition-colors"
                href="/features"
              >
                Features
              </Link>
              <Link
                className="text-[#111418] text-sm font-medium leading-normal hover:text-[#1980e6] transition-colors"
                href="/pricing"
              >
                Pricing
              </Link>
              <a className="text-[#1980e6] text-sm font-medium leading-normal" href="#">
                API
              </a>
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
              <Badge className="bg-[#1980e6] hover:bg-[#1570d1] text-white mb-6">Developer API</Badge>
              <h1 className="text-[#111418] text-4xl lg:text-6xl font-black leading-tight tracking-[-0.033em] mb-6">
                Build with BrowseMind API
              </h1>
              <p className="text-[#637588] text-lg lg:text-xl leading-relaxed mb-8 max-w-3xl mx-auto">
                Integrate browsing analytics into your applications with our powerful REST API. Access real-time data,
                create custom dashboards, and build productivity tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-[#1980e6] hover:bg-[#1570d1] text-white">
                  Get API Key
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#1980e6] text-[#1980e6] hover:bg-[#1980e6] hover:text-white"
                >
                  View Documentation
                </Button>
              </div>
            </div>
          </section>

          {/* Quick Start */}
          <section className="px-6 lg:px-40 py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-[960px] mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-[#111418] text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em] mb-6">
                  Quick Start
                </h2>
                <p className="text-[#637588] text-lg leading-relaxed max-w-2xl mx-auto">
                  Get started with the BrowseMind API in minutes. Here&apos;s a simple example to fetch browsing data.
                </p>
              </div>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Code className="size-6 text-[#1980e6]" />
                    <CardTitle className="text-xl">Example Request</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                      {`curl -X GET "https://api.browsemind.com/v1/browsing-data" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -G -d "date_range=7d" \\
     -d "category=productivity" \\
     -d "limit=50"`}
                    </pre>
                  </div>
                  <div className="mt-6">
                    <h4 className="text-[#111418] font-semibold mb-3">Response:</h4>
                    <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-gray-700 text-sm">
                        {`{
  "data": [
    {
      "id": "browse_123",
      "url": "https://github.com",
      "title": "GitHub",
      "category": "productivity",
      "time_spent": 3600,
      "visit_count": 15,
      "timestamp": "2025-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 150,
    "page": 1,
    "per_page": 50
  }
}`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* API Features */}
          <section className="px-6 lg:px-40 py-16 lg:py-24">
            <div className="max-w-[1200px] mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-[#111418] text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em] mb-6">
                  API Features
                </h2>
                <p className="text-[#637588] text-lg leading-relaxed max-w-2xl mx-auto">
                  Everything you need to build powerful applications with browsing analytics.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
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

          {/* Endpoints */}
          <section className="px-6 lg:px-40 py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-[1200px] mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-[#111418] text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em] mb-6">
                  API Endpoints
                </h2>
                <p className="text-[#637588] text-lg leading-relaxed max-w-2xl mx-auto">
                  Comprehensive endpoints to access all your browsing data and analytics.
                </p>
              </div>

              <div className="space-y-6">
                {endpoints.map((endpoint, index) => (
                  <Card key={index} className="shadow-md border-0 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        <div className="flex items-center gap-3">
                          <Badge
                            variant={endpoint.method === "GET" ? "secondary" : "default"}
                            className={
                              endpoint.method === "GET" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                            }
                          >
                            {endpoint.method}
                          </Badge>
                          <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono">{endpoint.endpoint}</code>
                        </div>
                        <div className="flex-1">
                          <p className="text-[#637588] text-sm mb-2">{endpoint.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {endpoint.params.map((param, paramIndex) => (
                              <span key={paramIndex} className="text-xs bg-gray-50 px-2 py-1 rounded border">
                                {param}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Rate Limits & Pricing */}
          <section className="px-6 lg:px-40 py-16 lg:py-24">
            <div className="max-w-[960px] mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-[#111418] text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em] mb-6">
                  API Pricing & Limits
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="border border-gray-200 shadow-md">
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl mb-2">Free Tier</CardTitle>
                    <div className="text-3xl font-black text-[#111418]">$0</div>
                    <p className="text-[#637588] text-sm">per month</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <Clock className="size-4 text-green-600" />
                        <span className="text-sm">1,000 requests/month</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <TrendingUp className="size-4 text-green-600" />
                        <span className="text-sm">Basic endpoints</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Download className="size-4 text-green-600" />
                        <span className="text-sm">Standard support</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 border-[#1980e6] shadow-lg scale-105">
                  <CardHeader className="text-center">
                    <Badge className="bg-[#1980e6] text-white mb-2">Most Popular</Badge>
                    <CardTitle className="text-xl mb-2">Pro API</CardTitle>
                    <div className="text-3xl font-black text-[#111418]">$49</div>
                    <p className="text-[#637588] text-sm">per month</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <Clock className="size-4 text-green-600" />
                        <span className="text-sm">100,000 requests/month</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <TrendingUp className="size-4 text-green-600" />
                        <span className="text-sm">All endpoints</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Webhook className="size-4 text-green-600" />
                        <span className="text-sm">Webhooks included</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Download className="size-4 text-green-600" />
                        <span className="text-sm">Priority support</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 shadow-md">
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl mb-2">Enterprise</CardTitle>
                    <div className="text-3xl font-black text-[#111418]">Custom</div>
                    <p className="text-[#637588] text-sm">pricing</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <Clock className="size-4 text-green-600" />
                        <span className="text-sm">Unlimited requests</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Key className="size-4 text-green-600" />
                        <span className="text-sm">Custom authentication</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Shield className="size-4 text-green-600" />
                        <span className="text-sm">SLA guarantee</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Download className="size-4 text-green-600" />
                        <span className="text-sm">Dedicated support</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="px-6 lg:px-40 py-16 lg:py-24 bg-gradient-to-r from-[#1980e6] to-[#0066cc]">
            <div className="max-w-[960px] mx-auto text-center">
              <h2 className="text-white text-3xl lg:text-5xl font-black leading-tight tracking-[-0.033em] mb-6">
                Ready to start building?
              </h2>
              <p className="text-white/90 text-lg lg:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
                Get your API key today and start integrating BrowseMind&apos;s powerful analytics into your applications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-[#1980e6] hover:bg-gray-100 text-lg px-8 py-4 h-auto"
                >
                  Get API Key
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#1980e6] text-lg px-8 py-4 h-auto"
                >
                  Read Documentation
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
