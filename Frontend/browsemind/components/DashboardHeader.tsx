"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
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
  Settings,
  LogOut,
} from "lucide-react"

interface DashboardHeaderProps {
  activeTab: "dashboard" | "reports" | "goals" | "explore"
  email?: string
  showNewButton?: boolean
  newButtonText?: string
  onNewClick?: () => void
}

export default function DashboardHeader({ 
  activeTab, 
  email = "john.doe@example.com", 
  showNewButton = false,
  newButtonText = "New",
  onNewClick 
}: DashboardHeaderProps) {
  const router = useRouter()

  const getInitials = (email: string) => {
    return email
      .split("@")[0]
      .split(".")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const handleLogout = async () => {
    await fetch("https://api.browsemind.net/api/logout/", {
      method: "POST",
      credentials: "include"
    });
    router.replace("/");
  }

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f4] bg-white px-6 lg:px-10 py-4 shadow-sm">
      <div className="flex items-center gap-3 text-[#111418]">
        <div className="size-8 bg-gradient-to-br from-[#1980e6] to-[#0066cc] rounded-lg flex items-center justify-center">
          <BarChart3 className="size-5 text-white" />
        </div>
        <h2 className="text-[#111418] text-xl font-bold leading-tight tracking-[-0.015em]">BrowseMind</h2>
      </div>

    <nav className="hidden md:flex items-center gap-8">
      <button
        className={`text-sm font-medium leading-normal transition-colors ${
        activeTab === "dashboard" 
          ? "text-[#1980e6] border-b-2 border-[#1980e6] pb-1" 
          : "text-[#637588] hover:text-[#1980e6]"
        }`}
        onClick={() => router.push("/dashboard")}
      >
        Dashboard
      </button>
      <button
        className={`text-sm font-medium leading-normal transition-colors ${
        activeTab === "reports" 
          ? "text-[#1980e6] border-b-2 border-[#1980e6] pb-1" 
          : "text-[#637588] hover:text-[#1980e6]"
        }`}
        onClick={() => router.push("/dashboard/reports")}
      >
        Reports
      </button>
      <button
        className={`text-sm font-medium leading-normal transition-colors ${
        activeTab === "goals" 
          ? "text-[#1980e6] border-b-2 border-[#1980e6] pb-1" 
          : "text-[#637588] hover:text-[#1980e6]"
        }`}
        onClick={() => router.push("/dashboard/goals")}
      >
        Goals
      </button>
      <button
        className={`text-sm font-medium leading-normal transition-colors ${
        activeTab === "explore" 
          ? "text-[#1980e6] border-b-2 border-[#1980e6] pb-1" 
          : "text-[#637588] hover:text-[#1980e6]"
        }`}
        onClick={() => router.push("/dashboard/explore")}
      >
        Explore
      </button>
    </nav>

      <div className="flex items-center gap-4">
        {showNewButton && (
          <Button className="bg-[#1980e6] hover:bg-[#1570d1] text-white" onClick={onNewClick}>
            <Plus className="size-4 mr-2" />
            {newButtonText}
          </Button>
        )}

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
  )
}