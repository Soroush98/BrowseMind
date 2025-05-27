import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, Clock, Globe, TrendingUp } from "lucide-react"
import Header from "@/components/Header"

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-white">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="px-6 lg:px-40 py-12 lg:py-20">
            <div className="max-w-[960px] mx-auto">
              <div className="relative">
                <div
                  className="flex min-h-[500px] lg:min-h-[600px] flex-col gap-8 bg-cover bg-center bg-no-repeat rounded-2xl items-start justify-end px-8 lg:px-12 pb-12 lg:pb-16 shadow-2xl"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%), url("/Browse.png?height=600&width=960")',
                  }}
                >
                  <div className="flex flex-col gap-6 text-left max-w-2xl">
                    <h1 className="text-white text-4xl lg:text-6xl font-black leading-tight tracking-[-0.033em]">
                      Uncover insights from your web browsing history
                    </h1>
                    <p className="text-white/90 text-lg lg:text-xl font-normal leading-relaxed">
                      BrowseMind helps you understand how you spend time online by analyzing your web browsing history.
                      Discover patterns, track productivity, and optimize your digital habits.
                    </p>
                  </div>
                    <Link href="/login" passHref>
                    <Button size="lg" className="bg-[#1980e6] hover:bg-[#1570d1] text-white text-lg px-8 py-4 h-auto">
                      Get started for free
                    </Button>
                    </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="px-6 lg:px-40 py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-[960px] mx-auto">
              <div className="flex flex-col gap-12">
                <div className="text-center max-w-3xl mx-auto">
                  <h2 className="text-[#111418] text-3xl lg:text-5xl font-black leading-tight tracking-[-0.033em] mb-6">
                    Understand your digital habits
                  </h2>
                  <p className="text-[#637588] text-lg lg:text-xl leading-relaxed mb-8">
                    Get comprehensive insights into your browsing activity, including time spent in each category, most
                    visited sites, and productivity patterns.
                  </p>
                    <Link href="/login" passHref>
                    <Button size="lg" className="bg-[#1980e6] hover:bg-[#1570d1] text-white">
                      Start analyzing now
                    </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                  <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                    <CardContent className="p-0">
                      <div
                        className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-t-xl"
                        style={{
                          backgroundImage: 'url("/placeholder.svg?height=300&width=400")',
                        }}
                      >
                        <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-t-xl flex items-center justify-center">
                          <Clock className="size-16 text-white drop-shadow-lg" />
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-[#111418] text-xl font-bold leading-normal mb-3">Track browsing time</h3>
                        <p className="text-[#637588] text-base leading-relaxed">
                          Monitor how much time you spend on different websites and categories. Identify time-wasting
                          habits and optimize your productivity.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                    <CardContent className="p-0">
                      <div
                        className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-t-xl"
                        style={{
                          backgroundImage: 'url("/placeholder.svg?height=300&width=400")',
                        }}
                      >
                        <div className="w-full h-full bg-gradient-to-br from-green-500/20 to-teal-600/20 rounded-t-xl flex items-center justify-center">
                          <TrendingUp className="size-16 text-white drop-shadow-lg" />
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-[#111418] text-xl font-bold leading-normal mb-3">
                          Analyze browsing patterns
                        </h3>
                        <p className="text-[#637588] text-base leading-relaxed">
                          Discover trends in your browsing behavior with detailed analytics, charts, and insights that
                          help you understand your digital habits.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                    <CardContent className="p-0">
                      <div
                        className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-t-xl"
                        style={{
                          backgroundImage: 'url("/placeholder.svg?height=300&width=400")',
                        }}
                      >
                        <div className="w-full h-full bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-t-xl flex items-center justify-center">
                          <Globe className="size-16 text-white drop-shadow-lg" />
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-[#111418] text-xl font-bold leading-normal mb-3">Discover top websites</h3>
                        <p className="text-[#637588] text-base leading-relaxed">
                          See your most visited websites ranked by frequency and time spent. Understand which sites
                          dominate your browsing activity.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                    <CardContent className="p-0">
                      <div
                        className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-t-xl"
                        style={{
                          backgroundImage: 'url("/placeholder.svg?height=300&width=400")',
                        }}
                      >
                        <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-t-xl flex items-center justify-center">
                          <BarChart3 className="size-16 text-white drop-shadow-lg" />
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-[#111418] text-xl font-bold leading-normal mb-3">Productivity insights</h3>
                        <p className="text-[#637588] text-base leading-relaxed">
                          Get personalized recommendations to improve your online productivity and reduce time spent on
                          distracting websites.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="px-6 lg:px-40 py-16 lg:py-24 bg-gradient-to-r from-[#1980e6] to-[#0066cc]">
            <div className="max-w-[960px] mx-auto text-center">
              <h2 className="text-white text-3xl lg:text-5xl font-black leading-tight tracking-[-0.033em] mb-6">
                Ready to understand your browsing habits?
              </h2>
              <p className="text-white/90 text-lg lg:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
                Join thousands of users who have already discovered insights about their digital behavior with
                BrowseMind.
              </p>
                <Link href="/login" passHref>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-[#1980e6] hover:bg-gray-100 text-lg px-8 py-4 h-auto"
                >
                  Start your free analysis
                </Button>
                </Link>
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
