"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Clock,
  Globe,
  Users,
  Lightbulb,
  Target,
  AlertTriangle,
  CheckCircle,
  Settings,
  LogOut,
  ArrowRight,
  Calendar,
  Zap,
} from "lucide-react"

export default function Explore() {
  const router = useRouter()
  const [email] = useState("john.doe@example.com")

  const insights = [
    {
      title: "Peak Productivity Hours",
      description: "You're most productive between 9-11 AM. Consider scheduling important tasks during this time.",
      type: "productivity",
      icon: TrendingUp,
      color: "bg-green-100 text-green-600",
      action: "Set Focus Block",
    },
    {
      title: "Social Media Pattern",
      description: "Your social media usage spikes after 6 PM. This might be affecting your evening productivity.",
      type: "warning",
      icon: AlertTriangle,
      color: "bg-yellow-100 text-yellow-600",
      action: "Create Goal",
    },
    {
      title: "Weekend Habits",
      description: "You spend 40% more time on entertainment sites during weekends compared to weekdays.",
      type: "insight",
      icon: Calendar,
      color: "bg-blue-100 text-blue-600",
      action: "View Details",
    },
    {
      title: "Focus Improvement",
      description: "Your focus sessions have increased by 25% this month. Keep up the great work!",
      type: "success",
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
      action: "Share Achievement",
    },
  ]

  const trends = [
    {
      category: "Productivity",
      change: "+12%",
      trend: "up",
      description: "Compared to last month",
      value: 78,
    },
    {
      category: "Social Media",
      change: "-8%",
      trend: "down",
      description: "Daily average time",
      value: 45,
    },
    {
      category: "Focus Time",
      change: "+15%",
      trend: "up",
      description: "Deep work sessions",
      value: 120,
    },
    {
      category: "Distractions",
      change: "-5%",
      trend: "down",
      description: "Interruption frequency",
      value: 12,
    },
  ]

  const recommendations = [
    {
      title: "Block Distracting Sites",
      description: "Consider blocking social media during your peak productivity hours (9-11 AM)",
      impact: "High",
      effort: "Low",
      category: "Productivity",
    },
    {
      title: "Set Evening Boundaries",
      description: "Create a digital sunset routine to improve sleep quality and morning focus",
      impact: "Medium",
      effort: "Medium",
      category: "Wellness",
    },
    {
      title: "Batch Similar Tasks",
      description: "Group similar browsing activities to reduce context switching",
      impact: "Medium",
      effort: "Low",
      category: "Efficiency",
    },
  ]

  const comparisons = [
    {
      metric: "Daily Screen Time",
      yourValue: "6h 45m",
      average: "7h 30m",
      status: "better",
    },
    {
      metric: "Productivity Score",
      yourValue: "78%",
      average: "65%",
      status: "better",
    },
    {
      metric: "Focus Sessions",
      yourValue: "3.2",
      average: "2.8",
      status: "better",
    },
    {
      metric: "Social Media Time",
      yourValue: "1h 15m",
      average: "2h 10m",
      status: "better",
    },
  ]

  const getInitials = (email: string) => {
    return email
      .split("@")[0]
      .split(".")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const handleLogout = () => {
    router.replace("/")
  }

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? TrendingUp : TrendingDown
  }

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-green-600" : "text-red-600"
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-gray-50">
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f4] bg-white px-6 lg:px-10 py-4 shadow-sm">
          <div className="flex items-center gap-3 text-[#111418]">
            <div className="size-8 bg-gradient-to-br from-[#1980e6] to-[#0066cc] rounded-lg flex items-center justify-center">
              <BarChart3 className="size-5 text-white" />
            </div>
            <h2 className="text-[#111418] text-xl font-bold leading-tight tracking-[-0.015em]">BrowseMind</h2>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a
              className="text-[#637588] text-sm font-medium leading-normal hover:text-[#1980e6] transition-colors"
              href="/dashboard"
            >
              Dashboard
            </a>
            <a
              className="text-[#637588] text-sm font-medium leading-normal hover:text-[#1980e6] transition-colors"
              href="/reports"
            >
              Reports
            </a>
            <a
              className="text-[#637588] text-sm font-medium leading-normal hover:text-[#1980e6] transition-colors"
              href="/goals"
            >
              Goals
            </a>
            <a className="text-[#1980e6] text-sm font-medium leading-normal border-b-2 border-[#1980e6] pb-1" href="#">
              Explore
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                    <AvatarFallback className="bg-[#1980e6] text-white">{getInitials(email)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium leading-none">{email}</p>
                  <p className="text-xs leading-none text-muted-foreground">Free Plan</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 px-6 lg:px-10 py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Page Header */}
            <div className="space-y-2">
              <h1 className="text-3xl lg:text-4xl font-black text-[#111418] tracking-[-0.033em]">Explore</h1>
              <p className="text-[#637588] text-lg">Discover insights and patterns in your browsing behavior</p>
            </div>

            {/* Key Insights */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-[#111418]">Key Insights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {insights.map((insight, index) => (
                  <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className={`size-10 ${insight.color} rounded-lg flex items-center justify-center`}>
                            <insight.icon className="size-5" />
                          </div>
                          <div className="space-y-2 flex-1">
                            <h3 className="font-semibold text-[#111418]">{insight.title}</h3>
                            <p className="text-sm text-[#637588]">{insight.description}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="w-full">
                          {insight.action}
                          <ArrowRight className="size-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Trends */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-[#111418]">Trends</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {trends.map((trend, index) => {
                  const TrendIcon = getTrendIcon(trend.trend)
                  return (
                    <Card key={index} className="border-0 shadow-md">
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-[#637588]">{trend.category}</span>
                            <div className={`flex items-center gap-1 ${getTrendColor(trend.trend)}`}>
                              <TrendIcon className="size-4" />
                              <span className="text-sm font-bold">{trend.change}</span>
                            </div>
                          </div>
                          <div className="text-2xl font-bold text-[#111418]">{trend.value}</div>
                          <p className="text-xs text-[#637588]">{trend.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recommendations */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#111418]">Recommendations</h2>
                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <Card key={index} className="border-0 shadow-md">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <h3 className="font-semibold text-[#111418]">{rec.title}</h3>
                              <p className="text-sm text-[#637588]">{rec.description}</p>
                            </div>
                            <Badge variant="secondary">{rec.category}</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex gap-4 text-sm">
                              <span className="text-[#637588]">
                                Impact: <span className="font-medium text-[#111418]">{rec.impact}</span>
                              </span>
                              <span className="text-[#637588]">
                                Effort: <span className="font-medium text-[#111418]">{rec.effort}</span>
                              </span>
                            </div>
                            <Button size="sm" className="bg-[#1980e6] hover:bg-[#1570d1]">
                              Apply
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Comparisons */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#111418]">How You Compare</h2>
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="size-5 text-[#1980e6]" />
                      vs. Average User
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {comparisons.map((comp, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-[#111418]">{comp.metric}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-[#111418]">{comp.yourValue}</span>
                            <Badge
                              variant="secondary"
                              className={
                                comp.status === "better" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }
                            >
                              {comp.status === "better" ? "Better" : "Needs Work"}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-xs text-[#637588]">Average: {comp.average}</div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className="size-5 text-[#1980e6]" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Target className="size-4 mr-2" />
                      Set New Goal
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Clock className="size-4 mr-2" />
                      Schedule Focus Time
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Globe className="size-4 mr-2" />
                      Block Distracting Sites
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Lightbulb className="size-4 mr-2" />
                      Get More Insights
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-[#f0f2f4] bg-white px-6 lg:px-10 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="size-6 bg-gradient-to-br from-[#1980e6] to-[#0066cc] rounded flex items-center justify-center">
                  <BarChart3 className="size-4 text-white" />
                </div>
                <span className="text-[#637588] text-sm">© 2025 BrowseMind. All rights reserved.</span>
              </div>
              <div className="flex flex-wrap gap-6">
                <a href="#" className="text-[#637588] text-sm hover:text-[#1980e6] transition-colors">
                  About
                </a>
                <a href="#" className="text-[#637588] text-sm hover:text-[#1980e6] transition-colors">
                  Pricing
                </a>
                <a href="#" className="text-[#637588] text-sm hover:text-[#1980e6] transition-colors">
                  Help
                </a>
                <a href="#" className="text-[#637588] text-sm hover:text-[#1980e6] transition-colors">
                  API
                </a>
                <a href="#" className="text-[#637588] text-sm hover:text-[#1980e6] transition-colors">
                  Privacy
                </a>
                <a href="#" className="text-[#637588] text-sm hover:text-[#1980e6] transition-colors">
                  Terms
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
