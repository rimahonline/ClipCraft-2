
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Layout, PlusCircle, FolderHeart, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Templates", icon: Layout, href: "/templates" },
  { label: "Create", icon: PlusCircle, href: "/create", primary: true },
  { label: "Projects", icon: FolderHeart, href: "/projects" },
  { label: "AI Tools", icon: Sparkles, href: "/create/ai" },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 border-t mobile-nav-blur flex items-center justify-around px-2 md:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center space-y-1 w-full h-full transition-colors",
              item.primary ? "text-primary" : "text-muted-foreground",
              isActive && !item.primary && "text-primary"
            )}
          >
            <item.icon className={cn("h-6 w-6", item.primary && "h-8 w-8")} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
