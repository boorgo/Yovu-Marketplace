"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FlightResults } from "@/components/journey/results/flight-results"
import { JourneySidebar } from "@/components/journey/journey-sidebar"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { mockFlightResults } from "@/lib/mock-flight-results"

export const dynamic = "force-dynamic"

export default function FlightResultsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [flights, setFlights] = useState(mockFlightResults)

  // Extract search parameters
  const origin = searchParams.get("origin") || ""
  const destination = searchParams.get("destination") || ""
  const departureDate = searchParams.get("departureDate")
    ? new Date(searchParams.get("departureDate") as string)
    : undefined
  const returnDate = searchParams.get("returnDate") ? new Date(searchParams.get("returnDate") as string) : undefined
  const cabinClass = searchParams.get("cabinClass") || "economy"
  const directFlightsOnly = searchParams.get("directFlightsOnly") === "true"
  const sustainabilityOptions = searchParams.get("sustainabilityOptions")
    ? (searchParams.get("sustainabilityOptions") as string).split(",")
    : []

  // Simulate loading flight results
  useEffect(() => {
    const timer = setTimeout(() => {
      // Filter flights based on search parameters
      let filteredFlights = [...mockFlightResults]

      if (directFlightsOnly) {
        filteredFlights = filteredFlights.filter((flight) => flight.stops === 0)
      }

      if (sustainabilityOptions.length > 0) {
        filteredFlights = filteredFlights.filter((flight) =>
          sustainabilityOptions.some((option) => flight.sustainabilityFeatures.includes(option)),
        )
      }

      // Sort by sustainability score by default
      filteredFlights.sort((a, b) => b.sustainabilityScore - a.sustainabilityScore)

      setFlights(filteredFlights)
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [directFlightsOnly, sustainabilityOptions])

  return (
    <div className="flex min-h-screen flex-col bg-yovu-mint">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-8">
          <Button variant="ghost" className="mb-4 text-yovu-charcoal" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to search
          </Button>

          <h1 className="text-3xl font-bold text-yovu-charcoal mb-2">
            Flights from {origin} to {destination}
          </h1>
          <p className="text-yovu-charcoal/80 mb-6">
            {departureDate && `Departing ${departureDate.toLocaleDateString()}`}
            {returnDate && ` - Returning ${returnDate.toLocaleDateString()}`}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <FlightResults
                flights={flights}
                loading={loading}
                origin={origin}
                destination={destination}
                departureDate={departureDate}
                returnDate={returnDate}
                cabinClass={cabinClass}
              />
            </div>
            <div>
              <JourneySidebar currentStep="flights" origin={origin} destination={destination} />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
