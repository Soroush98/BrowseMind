"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardFooter from "@/components/DashboardFooter";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Clock,
  TrendingUp,
  Target,
  AlertCircle,
  Calendar,
  Filter,
  Download,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useDashboardData, getDefaultDateRange } from "@/hooks/useDashboardData";

// Website categories
const CATEGORIES = [
  "news",
  "social media",
  "communication",
  "entertainment",
  "education",
  "shopping",
  "finance",
  "technology",
  "health",
  "travel",
  "government",
  "legal",
  "adult",
  "religion",
  "politics",
  "career",
  "real estate",
  "automotive",
  "food",
  "lifestyle",
  "sports",
  "science",
  "web services",
  "email",
  "illegal",
];

export default function Dashboard() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { categoryShares, topWebsites, fetchCategoryShares, fetchTopWebsites } = useDashboardData();

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [authLoading, isAuthenticated, router]);

  // Initialize dates and fetch data on mount
  useEffect(() => {
    if (isAuthenticated) {
      const { from, to } = getDefaultDateRange();
      setFromDate(from);
      setToDate(to);
      fetchCategoryShares(from, to);
      fetchTopWebsites(from, to);
    }
  }, [isAuthenticated, fetchCategoryShares, fetchTopWebsites]);

  // Refetch when dates change
  useEffect(() => {
    if (fromDate && toDate && isAuthenticated) {
      fetchCategoryShares(fromDate, toDate);
      fetchTopWebsites(fromDate, toDate);
    }
  }, [fromDate, toDate, isAuthenticated, fetchCategoryShares, fetchTopWebsites]);

  if (authLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="mb-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1980e6]"></div>
          </div>
          <p className="text-[#637588]">Loading...</p>
        </div>
      </div>
    );
  }

  const email = user || "";


  return (
    <div className="relative flex min-h-screen flex-col bg-gray-50">
      <div className="layout-container flex h-full grow flex-col">
          <DashboardHeader 
                    activeTab="dashboard" 
                    email={email} 
                    showNewButton={true}
                    newButtonText="New Report"
                  />
          <div className="flex items-center gap-4">
          </div>

        <main className="flex-1 px-6 lg:px-10 py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Welcome Section */}
            <div className="space-y-2">
              <h1 className="text-3xl lg:text-4xl font-black text-[#111418] tracking-[-0.033em]">
                Good evening, {email.split("@")[0]}
              </h1>
              <p className="text-[#637588] text-lg">Here&apos;s your activity summary for the past week</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#637588] text-sm font-medium">Total Time</p>
                      <p className="text-2xl font-bold text-[#111418]">20h 15m</p>
                      <p className="text-xs text-green-600 mt-1">+2.5h from last week</p>
                    </div>
                    <div className="size-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Clock className="size-6 text-[#1980e6]" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#637588] text-sm font-medium">Productivity</p>
                      <p className="text-2xl font-bold text-[#111418]">75%</p>
                      <p className="text-xs text-green-600 mt-1">+5% from last week</p>
                    </div>
                    <div className="size-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="size-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#637588] text-sm font-medium">Focus Score</p>
                      <p className="text-2xl font-bold text-[#111418]">85%</p>
                      <p className="text-xs text-green-600 mt-1">+3% from last week</p>
                    </div>
                    <div className="size-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Target className="size-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#637588] text-sm font-medium">Distractions</p>
                      <p className="text-2xl font-bold text-[#111418]">15%</p>
                      <p className="text-xs text-red-600 mt-1">-2% from last week</p>
                    </div>
                    <div className="size-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <AlertCircle className="size-6 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Category Breakdown */}
              <Card className="lg:col-span-2 border-0 shadow-md">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-[#111418]">Category Breakdown</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="size-4 mr-2" />
                        Filter
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="size-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="size-4 text-[#637588]" />
                      <label className="text-sm font-medium text-[#637588]">From:</label>
                      <input
                        type="datetime-local"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="border border-[#dce0e5] rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#1980e6] focus:border-transparent"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="size-4 text-[#637588]" />
                      <label className="text-sm font-medium text-[#637588]">To:</label>
                      <input
                        type="datetime-local"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="border border-[#dce0e5] rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#1980e6] focus:border-transparent"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(categoryShares).map(([category, percentage]) => (
                      <div key={category} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-[#111418] capitalize">{category}</span>
                          <span className="text-sm font-bold text-[#637588]">{percentage.toFixed(1)}%</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    ))}

                    {CATEGORIES
                      .filter((cat) => !categoryShares[cat])
                      .slice(0, 5)
                      .map((cat) => (
                        <div key={cat} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-[#637588] capitalize">{cat}</span>
                            <span className="text-sm text-[#637588]">0%</span>
                          </div>
                          <Progress value={0} className="h-2" />
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-[#111418]">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#637588]">Sites Visited</span>
                      <span className="text-lg font-bold text-[#111418]">127</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#637588]">Avg. Session</span>
                      <span className="text-lg font-bold text-[#111418]">12m</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#637588]">Peak Hour</span>
                      <span className="text-lg font-bold text-[#111418]">2-3 PM</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#f0f2f4]">
                    <h4 className="text-sm font-medium text-[#111418] mb-3">Goals Progress</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-[#637588]">Daily Productivity</span>
                          <span className="text-xs font-medium">75/80%</span>
                        </div>
                        <Progress value={93.75} className="h-1.5" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-[#637588]">Social Media Limit</span>
                          <span className="text-xs font-medium">45/60m</span>
                        </div>
                        <Progress value={75} className="h-1.5" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Sites Table */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-[#111418]">Top Sites</CardTitle>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-medium">Site</TableHead>
                      <TableHead className="font-medium">Category</TableHead>
                      <TableHead className="font-medium">Time Spent</TableHead>
                      <TableHead className="font-medium">Visits</TableHead>
                      <TableHead className="font-medium">Productive</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topWebsites.map((site, index) => (
                      <TableRow key={index} className="hover:bg-gray-50">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div className="size-8 bg-gray-100 rounded-lg flex items-center justify-center">
                              <span className="text-xs font-bold text-[#637588]">
                                {site.site.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            {site.site}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="text-xs">
                            {site.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-[#637588]">{site.time}</TableCell>
                        <TableCell className="text-[#637588]">{site.visits}</TableCell>
                        <TableCell>
                          <Badge
                            variant={site.productive ? "default" : "destructive"}
                            className={
                              site.productive
                                ? "bg-green-100 text-green-800 hover:bg-green-200"
                                : "bg-red-100 text-red-800 hover:bg-red-200"
                            }
                          >
                            {site.productive ? "Yes" : "No"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>            </Card>
          </div>
        </main>

        <DashboardFooter />
      </div>
    </div>
  )
}
