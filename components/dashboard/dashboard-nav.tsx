"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Home, Map, Calendar, Bookmark, Settings, LogOut } from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Journey Planner",
    href: "/dashboard/journey",
    icon: Map,
  },
  {
    title: "My Bookings",
    href: "/dashboard/bookings",
    icon: Calendar,
  },
  {
    title: "Saved Experiences",
    href: "/dashboard/saved",
    icon: Bookmark,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="grid items-start gap-2 py-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
            "justify-start",
          )}
        >
          <item.icon className="mr-2 h-4 w-4" />
          {item.title}
        </Link>
      ))}
      <Link
        href="/logout"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "hover:bg-transparent hover:underline justify-start text-muted-foreground",
        )}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Link>
    </nav>
  )
}
