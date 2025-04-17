"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Leaf, Map } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="w-full bg-yovu-mint py-4 border-b border-yovu-charcoal/10">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-yovu-charcoal" />
          <span className="font-bold text-xl text-yovu-charcoal">Yovu</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/design-journey"
            className="text-yovu-charcoal hover:text-yovu-charcoal/80 transition-colors flex items-center"
          >
            <Map className="mr-1 h-4 w-4" /> Design Journey
          </Link>
          <Link href="/#how-it-works" className="text-yovu-charcoal hover:text-yovu-charcoal/80 transition-colors">
            How It Works
          </Link>
          <Link href="/#impact-engine" className="text-yovu-charcoal hover:text-yovu-charcoal/80 transition-colors">
            Impact Engine
          </Link>
          <div className="flex items-center space-x-3">
            <Button asChild variant="outline" className="border-yovu-charcoal text-yovu-charcoal">
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild className="bg-yovu-charcoal text-white">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>

        <div className="flex items-center md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="border-yovu-charcoal bg-transparent">
                <Menu className="h-5 w-5 text-yovu-charcoal" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-yovu-mint">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/design-journey" className="text-lg font-medium text-yovu-charcoal flex items-center">
                  <Map className="mr-2 h-4 w-4" /> Design Journey
                </Link>
                <Link href="/#how-it-works" className="text-lg font-medium text-yovu-charcoal">
                  How It Works
                </Link>
                <Link href="/#impact-engine" className="text-lg font-medium text-yovu-charcoal">
                  Impact Engine
                </Link>
                <div className="flex flex-col gap-2 mt-4">
                  <Button asChild variant="outline" className="border-yovu-charcoal text-yovu-charcoal w-full">
                    <Link href="/login">Log In</Link>
                  </Button>
                  <Button asChild className="bg-yovu-charcoal text-white w-full">
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
