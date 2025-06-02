"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DashboardHeader from "@/components/DashboardHeader"
import DashboardFooter from "@/components/DashboardFooter"
import AuthWrapper from "@/components/AuthWrapper"
import {
  BarChart3,
  Plus,
  Target,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Edit,
  Trash2,
  Trophy,
  Settings,
}from "lucide-react"

const DOMAIN = "https://api.browsemind.net"

export default function Goals() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const goals = [
    {
      id: 1,
      title: "Limit Social Media",
      description: "Reduce daily social media usage to under 1 hour",
      category: "Time Limit",
      target: 60,
      current: 45,
      unit: "minutes",
      status: "active",
      deadline: "2025-02-01",
      progress: 75,
    },
    {
      id: 2,
      title: "Increase Productivity",
      description: "Achieve 80% productivity score daily",
      category: "Productivity",
      target: 80,
      current: 75,
      unit: "percent",
      status: "active",
      deadline: "2025-01-31",
      progress: 93.75,
    },
    {
      id: 3,
      title: "Focus Sessions",
      description: "Complete 3 focused work sessions daily",
      category: "Focus",
      target: 3,
      current: 2,
      unit: "sessions",
      status: "active",
      deadline: "2025-02-15",
      progress: 66.67,
    },
    {
      id: 4,
      title: "News Reading Limit",
      description: "Limit news consumption to 30 minutes per day",
      category: "Time Limit",
      target: 30,
      current: 25,
      unit: "minutes",
      status: "completed",
      deadline: "2025-01-15",
      progress: 100,
    },
  ]

  const achievements = [
    {
      title: "First Goal Completed",
      description: "Completed your first productivity goal",
      date: "2025-01-15",
      icon: Trophy,
    },
    {
      title: "Week Streak",
      description: "Maintained goals for 7 consecutive days",
      date: "2025-01-10",
      icon: Target,
    },
    {
      title: "Focus Master",
      description: "Completed 20 focus sessions",
      date: "2025-01-05",
      icon: CheckCircle,
    },
  ]


  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "active":
        return "bg-blue-100 text-blue-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Time Limit":
        return Clock
      case "Productivity":
        return TrendingUp
      case "Focus":
        return Target
      default:
        return AlertCircle
    }
  }
  return (
    <AuthWrapper>
      {(email) => (
        <div className="relative flex min-h-screen flex-col bg-gray-50">
          <div className="layout-container flex h-full grow flex-col">
            <DashboardHeader 
              activeTab="goals" 
              email={email} 
              showNewButton={true}
              newButtonText="New Goal"
              onNewClick={() => setIsCreateDialogOpen(true)}
            />

            <main className="flex-1 px-6 lg:px-10 py-8">
              <div className="max-w-7xl mx-auto space-y-8">
                {/* Page Header */}
                <div className="space-y-2">
                  <h1 className="text-3xl lg:text-4xl font-black text-[#111418] tracking-[-0.033em]">Goals</h1>
                  <p className="text-[#637588] text-lg">Set and track your productivity goals</p>
                </div>

                {/* Goals Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[#637588] text-sm font-medium">Active Goals</p>
                          <p className="text-2xl font-bold text-[#111418]">3</p>
                        </div>
                        <div className="size-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Target className="size-6 text-[#1980e6]" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[#637588] text-sm font-medium">Completed</p>
                          <p className="text-2xl font-bold text-[#111418]">1</p>
                        </div>
                        <div className="size-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <CheckCircle className="size-6 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[#637588] text-sm font-medium">Success Rate</p>
                          <p className="text-2xl font-bold text-[#111418]">75%</p>
                        </div>
                        <div className="size-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <TrendingUp className="size-6 text-purple-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Active Goals */}
                  <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-[#111418]">Your Goals</h2>
                    <div className="space-y-4">
                      {goals.map((goal) => {
                        const CategoryIcon = getCategoryIcon(goal.category)
                        return (
                          <Card key={goal.id} className="border-0 shadow-md">
                            <CardContent className="p-6">
                              <div className="space-y-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex items-start gap-3">
                                    <div className="size-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                      <CategoryIcon className="size-5 text-[#1980e6]" />
                                    </div>
                                    <div className="space-y-1">
                                      <h3 className="font-semibold text-[#111418]">{goal.title}</h3>
                                      <p className="text-sm text-[#637588]">{goal.description}</p>
                                      <div className="flex items-center gap-2">
                                        <Badge variant="secondary">{goal.category}</Badge>
                                        <Badge className={getStatusColor(goal.status)}>{goal.status}</Badge>
                                      </div>
                                    </div>
                                  </div>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm">
                                        <Settings className="size-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem className="text-red-600">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>

                                <div className="space-y-2">
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-[#637588]">Progress</span>
                                    <span className="font-medium">
                                      {goal.current} / {goal.target} {goal.unit}
                                    </span>
                                  </div>
                                  <Progress value={goal.progress} className="h-2" />
                                  <div className="flex items-center justify-between text-xs text-[#637588]">
                                    <span>{goal.progress.toFixed(1)}% complete</span>
                                    <span>Due: {goal.deadline}</span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-[#111418]">Achievements</h2>
                    <Card className="border-0 shadow-md">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {achievements.map((achievement, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <div className="size-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <achievement.icon className="size-5 text-yellow-600" />
                              </div>
                              <div className="space-y-1">
                                <h4 className="font-medium text-[#111418]">{achievement.title}</h4>
                                <p className="text-sm text-[#637588]">{achievement.description}</p>
                                <p className="text-xs text-[#637588]">{achievement.date}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Goal Tips */}
                    <Card className="border-0 shadow-md">
                      <CardHeader>
                        <CardTitle className="text-lg">Goal Tips</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="text-sm text-[#637588]">
                          <p className="font-medium text-[#111418] mb-1">Set SMART Goals</p>
                          <p>Make your goals Specific, Measurable, Achievable, Relevant, and Time-bound.</p>
                        </div>
                        <div className="text-sm text-[#637588]">
                          <p className="font-medium text-[#111418] mb-1">Start Small</p>
                          <p>Begin with smaller, achievable goals to build momentum and confidence.</p>
                        </div>
                        <div className="text-sm text-[#637588]">
                          <p className="font-medium text-[#111418] mb-1">Track Progress</p>
                          <p>Regular monitoring helps you stay on track and make necessary adjustments.</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </main>

            <DashboardFooter />
          </div>
        </div>
      )}
    </AuthWrapper>
  )
}
