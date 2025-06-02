"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const DOMAIN = "https://api.browsemind.net"

interface AuthWrapperProps {
  children: (email: string) => React.ReactNode
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(DOMAIN + "/api/session", { credentials: "include" })
        if (res.ok) {
          const data = await res.json()
          if (data && data.ok && data.email) {
            setEmail(data.email)
            setIsAuthenticated(true)
          } else {
            window.location.href = "/"
          }
        } else {
          window.location.href = "/"
        }
      } catch {
        window.location.href = "/"
      }
    }
    checkAuth()
  }, [router])

  if (!isAuthenticated) {
    return null // or a loading spinner
  }

  return <>{children(email)}</>
}