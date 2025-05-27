import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f4] px-6 lg:px-10 py-4">
      <div className="flex items-center gap-3 text-[#111418]">
        <div className="size-8 bg-gradient-to-br from-[#1980e6] to-[#0066cc] rounded-lg flex items-center justify-center">
          <BarChart3 className="size-5 text-white" />
        </div>
        <h2 className="text-[#111418] text-xl font-bold leading-tight tracking-[-0.015em]">BrowseMind</h2>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-[#111418] text-sm font-medium leading-normal hover:text-[#1980e6] transition-colors">
            Home
          </Link>
          <Link href="/features" className="text-[#111418] text-sm font-medium leading-normal hover:text-[#1980e6] transition-colors">
            Features
          </Link>
          <Link href="/pricing" className="text-[#111418] text-sm font-medium leading-normal hover:text-[#1980e6] transition-colors">
            Pricing
          </Link>
          <Link href="/api" className="text-[#111418] text-sm font-medium leading-normal hover:text-[#1980e6] transition-colors">
            API
          </Link>
        </div>
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
  );
}
