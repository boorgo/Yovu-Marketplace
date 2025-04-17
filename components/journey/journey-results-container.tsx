"use client"

import { useState, useEffect, useMemo } from "react"
import { JourneyResultsHeader } from "@/components/journey/journey-results-header"
import { JourneyFilters } from "@/components/journey/journey-filters"
import { JourneyResults } from "@/components/journey/journey-results"
import { JourneySidebar } from "@/components/journey/journey-sidebar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bed, Utensils, Bike, Car, Plane, Globe } from "lucide-react"
import type { JourneyResult } from "@/lib/mock-journey-results"
import { JourneyBuilderProvider } from "@/lib/journey-builder-context"

// Define the FlightSearchParams type
export interface FlightSearchParams {
  adults: number
  children: number
  infants: number
  cabinClass: string
}

// Define the search configuration type
export interface SearchConfig {
  destination: string
  startDate?: Date
  endDate?: Date
  travelers: number
  budget: [number, number]
  sustainabilityLevel: number
  activityPreferences: string[]
  accommodationTypes: string[]
  diningPreferences: string[]
  transportationTypes: string[]
  flightParams?: FlightSearchParams
}

interface JourneyResultsContainerProps {
  searchConfig: SearchConfig
  initialResults: JourneyResult[]
}

export function JourneyResultsContainer({ searchConfig, initialResults }: JourneyResultsContainerProps) {
  // State for active tab
  const [activeTab, setActiveTab] = useState("all")

  // State for filters
  const [filters, setFilters] = useState({
    sustainabilityFeatures: [] as string[],
    priceRange: searchConfig.budget as [number, number],
    sortBy: "sustainability" as "sustainability" | "price-low" | "price-high" | "rating",
  })

  // State for loading
  const [loading, setLoading] = useState(true)

  // Memoize the filtered results to prevent unnecessary recalculations
  const filteredResults = useMemo(() => {
    let results = [...initialResults]

    // Filter by service type
    if (activeTab !== "all") {
      results = results.filter((item) => item.type === activeTab)
    }

    // Filter by sustainability level
    if (searchConfig.sustainabilityLevel > 0) {
      results = results.filter((item) => item.sustainabilityScore >= searchConfig.sustainabilityLevel)
    }

    // Filter by activity preferences
    if (searchConfig.activityPreferences.length > 0 && (activeTab === "activity" || activeTab === "all")) {
      results = results.filter((item) => {
        if (item.type !== "activity" && activeTab === "all") return true
        return item.tags && searchConfig.activityPreferences.some((pref) => item.tags?.includes(pref))
      })
    }

    // Filter by accommodation types
    if (searchConfig.accommodationTypes.length > 0 && (activeTab === "accommodation" || activeTab === "all")) {
      results = results.filter((item) => {
        if (item.type !== "accommodation" && activeTab === "all") return true
        return item.tags && searchConfig.accommodationTypes.some((type) => item.tags?.includes(type))
      })
    }

    // Filter by dining preferences
    if (searchConfig.diningPreferences.length > 0 && (activeTab === "restaurant" || activeTab === "all")) {
      results = results.filter((item) => {
        if (item.type !== "restaurant" && activeTab === "all") return true
        return item.tags && searchConfig.diningPreferences.some((pref) => item.tags?.includes(pref))
      })
    }

    // Filter by transportation types
    if (searchConfig.transportationTypes.length > 0 && (activeTab === "transportation" || activeTab === "all")) {
      results = results.filter((item) => {
        if (item.type !== "transportation" && activeTab === "all") return true
        return item.tags && searchConfig.transportationTypes.some((type) => item.tags?.includes(type))
      })
    }

    // Filter by sustainability features
    if (filters.sustainabilityFeatures.length > 0) {
      results = results.filter((item) =>
        item.sustainabilityFeatures.some((feature) => filters.sustainabilityFeatures.includes(feature)),
      )
    }

    // Filter by price range
    results = results.filter((item) => item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1])

    // Apply sorting
    switch (filters.sortBy) {
      case "sustainability":
        results.sort((a, b) => b.sustainabilityScore - a.sustainabilityScore)
        break
      case "price-low":
        results.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        results.sort((a, b) => b.price - a.price)
        break
      case "rating":
        results.sort((a, b) => b.rating - a.rating)
        break
    }

    return results
  }, [
    initialResults,
    activeTab,
    filters,
    searchConfig.sustainabilityLevel,
    searchConfig.activityPreferences,
    searchConfig.accommodationTypes,
    searchConfig.diningPreferences,
    searchConfig.transportationTypes,
  ])

  // Simulate loading state
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [activeTab, filters])

  return (
    <JourneyBuilderProvider>
      <JourneyResultsHeader searchConfig={searchConfig} />

      <div className="container py-6">
        {/* Service Type Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-6 bg-yovu-mint">
            <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-yovu-charcoal">
              <span className="flex items-center">
                <Globe className="mr-2 h-4 w-4" />
                All
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="accommodation"
              className="data-[state=active]:bg-white data-[state=active]:text-yovu-charcoal"
            >
              <span className="flex items-center">
                <Bed className="mr-2 h-4 w-4" />
                Stays
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              className="data-[state=active]:bg-white data-[state=active]:text-yovu-charcoal"
            >
              <span className="flex items-center">
                <Bike className="mr-2 h-4 w-4" />
                Activities
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="restaurant"
              className="data-[state=active]:bg-white data-[state=active]:text-yovu-charcoal"
            >
              <span className="flex items-center">
                <Utensils className="mr-2 h-4 w-4" />
                Dining
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="transportation"
              className="data-[state=active]:bg-white data-[state=active]:text-yovu-charcoal"
            >
              <span className="flex items-center">
                <Car className="mr-2 h-4 w-4" />
                Transport
              </span>
            </TabsTrigger>
            <TabsTrigger value="flight" className="data-[state=active]:bg-white data-[state=active]:text-yovu-charcoal">
              <span className="flex items-center">
                <Plane className="mr-2 h-4 w-4" />
                Flights
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Filters */}
        <JourneyFilters filters={filters} onChange={setFilters} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-6">
          <div className="lg:col-span-3">
            <JourneyResults results={filteredResults} loading={loading} activeTab={activeTab} />
          </div>

          <div className="lg:col-span-1">
            <JourneySidebar searchConfig={searchConfig} />
          </div>
        </div>
      </div>
    </JourneyBuilderProvider>
  )
}
