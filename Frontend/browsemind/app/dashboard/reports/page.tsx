"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import DashboardHeader from "@/components/DashboardHeader"
import DashboardFooter from "@/components/DashboardFooter"
import AuthWrapper from "@/components/AuthWrapper"
import {
  BarChart3,
  Search,
  Filter,
  Download,
  Calendar,
  Clock,
  TrendingUp,
  FileText,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"


export default function Reports() {
  const [searchQuery, setSearchQuery] = useState("")

  const reports = [
    {
      id: 1,
      name: "Weekly Productivity Report",
      type: "Productivity",
      dateRange: "Last 7 days",
      createdAt: "2025-01-15",
      status: "Generated",
      size: "2.3 MB",
    },
    {
      id: 2,
      name: "Social Media Usage Analysis",
      type: "Category Analysis",
      dateRange: "Last 30 days",
      createdAt: "2025-01-12",
      status: "Generated",
      size: "1.8 MB",
    },
    {
      id: 3,
      name: "Monthly Time Tracking",
      type: "Time Analysis",
      dateRange: "December 2023",
      createdAt: "2025-01-01",
      status: "Generated",
      size: "4.1 MB",
    },
    {
      id: 4,
      name: "Focus Session Report",
      type: "Focus Analysis",
      dateRange: "Last 14 days",
      createdAt: "2025-01-10",
      status: "Processing",
      size: "-",
    },
  ]

  const templates = [
    {
      name: "Daily Summary",
      description: "Quick overview of daily browsing activity",
      icon: Calendar,
      color: "bg-blue-100 text-blue-600",
    },
    {
      name: "Productivity Analysis",
      description: "Detailed productivity metrics and insights",
      icon: TrendingUp,
      color: "bg-green-100 text-green-600",
    },
    {
      name: "Time Tracking",
      description: "Comprehensive time spent analysis",
      icon: Clock,
      color: "bg-purple-100 text-purple-600",
    },
    {
      name: "Category Breakdown",
      description: "Website category usage patterns",
      icon: BarChart3,
      color: "bg-orange-100 text-orange-600",
    },
  ]
  return (
    <AuthWrapper>
      {(email) => (
        <div className="relative flex min-h-screen flex-col bg-gray-50">
          <div className="layout-container flex h-full grow flex-col">
            <DashboardHeader 
              activeTab="reports" 
              email={email} 
              showNewButton={true}
              newButtonText="New Report"
            />

        <main className="flex-1 px-6 lg:px-10 py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Page Header */}
            <div className="space-y-2">
              <h1 className="text-3xl lg:text-4xl font-black text-[#111418] tracking-[-0.033em]">Reports</h1>
              <p className="text-[#637588] text-lg">Generate and manage your browsing analytics reports</p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#637588] size-4" />
                <Input
                  placeholder="Search reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="size-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline">
                  <Download className="size-4 mr-2" />
                  Export All
                </Button>
              </div>
            </div>

            {/* Report Templates */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-[#111418]">Quick Templates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {templates.map((template, index) => (
                  <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className={`size-12 ${template.color} rounded-lg flex items-center justify-center`}>
                          <template.icon className="size-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#111418] group-hover:text-[#1980e6] transition-colors">
                            {template.name}
                          </h3>
                          <p className="text-sm text-[#637588] mt-1">{template.description}</p>
                        </div>
                        <Button size="sm" className="w-full bg-[#1980e6] hover:bg-[#1570d1]">
                          Generate Report
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Reports */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#111418]">Recent Reports</h2>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>

              <Card className="border-0 shadow-md">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-medium">Report Name</TableHead>
                        <TableHead className="font-medium">Type</TableHead>
                        <TableHead className="font-medium">Date Range</TableHead>
                        <TableHead className="font-medium">Created</TableHead>
                        <TableHead className="font-medium">Status</TableHead>
                        <TableHead className="font-medium">Size</TableHead>
                        <TableHead className="font-medium">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reports.map((report) => (
                        <TableRow key={report.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <div className="size-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FileText className="size-4 text-blue-600" />
                              </div>
                              {report.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{report.type}</Badge>
                          </TableCell>
                          <TableCell className="text-[#637588]">{report.dateRange}</TableCell>
                          <TableCell className="text-[#637588]">{report.createdAt}</TableCell>
                          <TableCell>
                            <Badge
                              variant={report.status === "Generated" ? "default" : "secondary"}
                              className={
                                report.status === "Generated"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {report.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-[#637588]">{report.size}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="size-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="mr-2 h-4 w-4" />
                                  Download
                                </DropdownMenuItem>
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
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
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
