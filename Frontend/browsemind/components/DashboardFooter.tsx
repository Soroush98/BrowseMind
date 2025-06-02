import { BarChart3 } from "lucide-react"

export default function DashboardFooter() {
  return (
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
  )
}