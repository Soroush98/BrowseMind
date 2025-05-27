"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
  Plus,
  Target,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Settings,
  LogOut,
  Edit,
  Trash2,
  Trophy,
} from "lucide-react"

export default function Goals() {
  const router = useRouter()
  const [email] = useState("john.doe@example.com")
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
      deadline: "2024-02-01",
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
      deadline: "2024-01-31",
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
      deadline: "2024-02-15",
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
      deadline: "2024-01-15",
      progress: 100,
    },
  ]

  const achievements = [
    {
      title: "First Goal Completed",
      description: "Completed your first productivity goal",
      date: "2024-01-15",
      icon: Trophy,
    },
    {
      title: "Week Streak",
      description: "Maintained goals for 7 consecutive days",
      date: "2024-01-10",
      icon: Target,
    },
    {
      title: "Focus Master",
      description: "Completed 20 focus sessions",
      date: "2024-01-05",
      icon: CheckCircle,
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
            <a className="text-[#1980e6] text-sm font-medium leading-normal border-b-2 border-[#1980e6] pb-1" href="#">
              Goals
            </a>
            <a
              className="text-[#637588] text-sm font-medium leading-normal hover:text-[#1980e6] transition-colors"
              href="/explore"
            >
              Explore
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#1980e6] hover:bg-[#1570d1] text-white">
                  <Plus className="size-4 mr-2" />
                  New Goal
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Goal</DialogTitle>
                  <DialogDescription>Set a new productivity goal to track your progress.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Goal Title</Label>
                    <Input id="title" placeholder="Enter goal title" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Describe your goal" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="time-limit">Time Limit</SelectItem>
                        <SelectItem value="productivity">Productivity</SelectItem>
                        <SelectItem value="focus">Focus</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="target">Target Value</Label>
                      <Input id="target" type="number" placeholder="0" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="unit">Unit</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="minutes">Minutes</SelectItem>
                          <SelectItem value="hours">Hours</SelectItem>
                          <SelectItem value="percent">Percent</SelectItem>
                          <SelectItem value="sessions">Sessions</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="deadline">Deadline</Label>
                    <Input id="deadline" type="date" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-[#1980e6] hover:bg-[#1570d1]">
                    Create Goal
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

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

        {/* Footer */}
        <footer className="border-t border-[#f0f2f4] bg-white px-6 lg:px-10 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="size-6 bg-gradient-to-br from-[#1980e6] to-[#0066cc] rounded flex items-center justify-center">
                  <BarChart3 className="size-4 text-white" />
                </div>
                <span className="text-[#637588] text-sm">© 2024 BrowseMind. All rights reserved.</span>
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
