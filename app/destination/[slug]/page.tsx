"use client"

import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DestinationHeader } from "@/components/destination/destination-header"
import { DestinationFilters } from "@/components/destination/destination-filters"
import { DestinationResults } from "@/components/destination/destination-results"
import { JourneySidebar } from "@/components/destination/journey-sidebar"
import { mockDestinationData } from "@/lib/mock-destination-data"

export const dynamic = "force-dynamic"

export default function DestinationPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const slug = params?.slug as string

  // Format destination name for display (convert slug to title case)
  const destinationName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  // Get date parameters
  const fromDate = searchParams.get("from") ? new Date(searchParams.get("from") as string) : undefined
  const toDate = searchParams.get("to") ? new Date(searchParams.get("to") as string) : undefined
  const travelers = searchParams.get("travelers") || "2"

  // State for filters
  const [activeFilters, setActiveFilters] = useState({
    serviceTypes: [] as string[],
    sustainabilityFeatures: [] as string[],
    priceRange: [0, 1000] as [number, number],
    sortBy: "sustainability" as "sustainability" | "price-low" | "price-high" | "rating",
  })

  // State for results
  const [results, setResults] = useState(mockDestinationData)
  const [loading, setLoading] = useState(true)

  // Apply filters
  useEffect(() => {
    setLoading(true)

    // Simulate API call with delay
    const timer = setTimeout(() => {
      let filteredResults = [...mockDestinationData]

      // Filter by service type
      if (activeFilters.serviceTypes.length > 0) {
        filteredResults = filteredResults.filter((item) => activeFilters.serviceTypes.includes(item.type))
      }

      // Filter by sustainability features
      if (activeFilters.sustainabilityFeatures.length > 0) {
        filteredResults = filteredResults.filter((item) =>
          item.sustainabilityFeatures.some((feature) => activeFilters.sustainabilityFeatures.includes(feature)),
        )
      }

      // Filter by price range
      filteredResults = filteredResults.filter(
        (item) => item.price >= activeFilters.priceRange[0] && item.price <= activeFilters.priceRange[1],
      )

      // Apply sorting
      switch (activeFilters.sortBy) {
        case "sustainability":
          filteredResults.sort((a, b) => b.sustainabilityScore - a.sustainabilityScore)
          break
        case "price-low":
          filteredResults.sort((a, b) => a.price - b.price)
          break
        case "price-high":
          filteredResults.sort((a, b) => b.price - a.price)
          break
        case "rating":
          filteredResults.sort((a, b) => b.rating - a.rating)
          break
      }

      setResults(filteredResults)
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [activeFilters])

  return (
    <div className="flex min-h-screen flex-col bg-yovu-mint">
      <SiteHeader />
      <main className="flex-1">
        <DestinationHeader
          destination={destinationName}
          fromDate={fromDate}
          toDate={toDate}
          travelers={Number.parseInt(travelers)}
        />

        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <DestinationFilters filters={activeFilters} onChange={setActiveFilters} />
            </div>

            <div className="lg:col-span-2">
              <DestinationResults results={results} loading={loading} />
            </div>

            <div className="lg:col-span-1">
              <JourneySidebar destination={destinationName} />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
