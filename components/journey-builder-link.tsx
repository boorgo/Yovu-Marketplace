"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

export function JourneyBuilderLink() {
  return (
    <Button asChild variant="ghost" className="text-yovu-charcoal hover:text-yovu-mint hover:bg-transparent">
      <Link href="/journey-builder">
        <MapPin className="mr-2 h-4 w-4" />
        <span>My Journey</span>
      </Link>
    </Button>
  )
}
