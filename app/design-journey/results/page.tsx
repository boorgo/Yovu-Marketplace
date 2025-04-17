"use client"
import { useSearchParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { mockJourneyResults } from "@/lib/mock-journey-results"
import { JourneyResultsContainer } from "@/components/journey/journey-results-container"

export default function JourneyResultsPage() {
  const searchParams = useSearchParams()

  // Get search parameters once
  const destination = searchParams.get("destination") || ""
  const startDate = searchParams.get("startDate") ? new Date(searchParams.get("startDate") as string) : undefined
  const endDate = searchParams.get("endDate") ? new Date(searchParams.get("endDate") as string) : undefined
  const travelers = Number.parseInt(searchParams.get("travelers") || "2", 10)
  const minBudget = Number.parseInt(searchParams.get("minBudget") || "0", 10)
  const maxBudget = Number.parseInt(searchParams.get("maxBudget") || "10000", 10)
  const sustainabilityLevel = Number.parseInt(searchParams.get("sustainability") || "50", 10)

  // Get preference arrays once
  const activityPreferences = searchParams.getAll("activity")
  const accommodationTypes = searchParams.getAll("accommodation")
  const diningPreferences = searchParams.getAll("dining")
  const transportationTypes = searchParams.getAll("transportation")

  // Create a search config object to pass to child components
  const searchConfig = {
    destination,
    startDate,
    endDate,
    travelers,
    budget: [minBudget, maxBudget] as [number, number],
    sustainabilityLevel,
    activityPreferences,
    accommodationTypes,
    diningPreferences,
    transportationTypes,
  }

  return (
    <div className="flex min-h-screen flex-col bg-yovu-mint">
      <SiteHeader />
      <main className="flex-1">
        <JourneyResultsContainer searchConfig={searchConfig} initialResults={mockJourneyResults} />
      </main>
      <SiteFooter />
    </div>
  )
}
