"use client"

import { useSearchParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { mockJourneyResults } from "@/lib/mock-journey-results"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Star, Plus, Leaf, Plane, ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function FlightResultsPage() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [results, setResults] = useState<any[]>([])

  // Extract flight search parameters
  const tripType = searchParams.get("tripType") || "round-trip"
  const origin = searchParams.get("origin") || ""
  const destination = searchParams.get("destination") || ""
  const departureDate = searchParams.get("departureDate")
    ? new Date(searchParams.get("departureDate") as string)
    : undefined
  const returnDate = searchParams.get("returnDate") ? new Date(searchParams.get("returnDate") as string) : undefined
  const adults = Number(searchParams.get("adults") || "1")
  const children = Number(searchParams.get("children") || "0")
  const infants = Number(searchParams.get("infants") || "0")
  const cabinClass = searchParams.get("cabinClass") || "economy"
  const directFlightsOnly = searchParams.get("directFlightsOnly") === "true"
  const flexibleDates = searchParams.get("flexibleDates") === "true"
  const baggageIncluded = searchParams.get("baggageIncluded") === "true"
  const sustainableOnly = searchParams.get("sustainableOnly") === "true"
  const preferredAirlines = searchParams.getAll("airline")

  // Simulate API call to fetch flight results
  useEffect(() => {
    setLoading(true)

    // Simulate API delay
    const timer = setTimeout(() => {
      // Filter mock results to show only flights
      const flightResults = mockJourneyResults.filter((result) => {
        if (result.type !== "flight") return false

        // Apply filters based on search parameters
        if (directFlightsOnly && result.stops && result.stops > 0) return false
        if (cabinClass && result.cabinClass !== cabinClass) return false
        if (sustainableOnly && result.sustainabilityScore < 70) return false
        if (preferredAirlines.length > 0 && result.airline) {
          const airlineCode = result.airline.split(" ")[0]
          if (!preferredAirlines.includes(airlineCode)) return false
        }

        return true
      })

      setResults(flightResults)
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [cabinClass, directFlightsOnly, preferredAirlines, sustainableOnly])

  return (
    <div className="flex min-h-screen flex-col bg-yovu-mint">
      <SiteHeader />
      <main className="flex-1">
        <div className="bg-yovu-charcoal text-white py-6">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-2xl font-bold mb-2">Flight Search Results</h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-yovu-mint text-yovu-charcoal">
                    {origin} → {destination}
                  </Badge>
                  {tripType === "round-trip" && (
                    <Badge className="bg-yovu-mint text-yovu-charcoal">
                      {destination} → {origin}
                    </Badge>
                  )}
                  <Badge className="bg-yovu-mint text-yovu-charcoal">
                    {departureDate?.toLocaleDateString()}
                    {returnDate && ` - ${returnDate.toLocaleDateString()}`}
                  </Badge>
                  <Badge className="bg-yovu-mint text-yovu-charcoal">
                    {adults + children + infants} Passenger{adults + children + infants > 1 ? "s" : ""}
                  </Badge>
                  <Badge className="bg-yovu-mint text-yovu-charcoal">
                    {cabinClass.charAt(0).toUpperCase() + cabinClass.slice(1).replace("-", " ")}
                  </Badge>
                  {directFlightsOnly && <Badge className="bg-yovu-mint text-yovu-charcoal">Direct Flights Only</Badge>}
                  {baggageIncluded && <Badge className="bg-yovu-mint text-yovu-charcoal">Baggage Included</Badge>}
                </div>
              </div>
              <Link href="/design-journey">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-yovu-charcoal">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Modify Search
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="container py-8">
          {loading ? (
            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <Skeleton className="h-48 md:h-auto md:w-1/3 rounded-none" />
                    <div className="flex-1 p-6">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-4 w-2/3" />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : results.length === 0 ? (
            <Card className="p-6 text-center">
              <h3 className="text-lg font-medium mb-2">No flights found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search criteria to find more options.</p>
              <Link href="/design-journey">
                <Button className="bg-yovu-charcoal text-white">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Search
                </Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-yovu-charcoal">{results.length} flight options found</h2>
                <div className="flex gap-2">
                  <Badge className="bg-green-500 text-white">
                    <Leaf className="h-3 w-3 mr-1" /> Carbon Offset Available
                  </Badge>
                </div>
              </div>

              {results.map((flight) => (
                <Card key={flight.id} className="overflow-hidden border-yovu-mint hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 relative">
                      <img
                        src={flight.image || "/placeholder.svg?height=300&width=400"}
                        alt={flight.title}
                        className="h-48 md:h-full w-full object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-yovu-charcoal">
                        {flight.sustainabilityScore}% Sustainable
                      </Badge>
                    </div>

                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="bg-yovu-mint/20 text-yovu-charcoal border-yovu-mint">
                              <span className="flex items-center gap-1">
                                <Plane className="h-5 w-5" />
                                Flight
                              </span>
                            </Badge>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              <span className="ml-1 text-sm font-medium">{flight.rating}</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-bold text-yovu-charcoal">{flight.title}</h3>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-yovu-charcoal/70">from</div>
                          <div className="text-xl font-bold text-yovu-charcoal">
                            {flight.currency} {flight.price}
                          </div>
                          <div className="text-xs text-yovu-charcoal/70">
                            {baggageIncluded ? "Baggage included" : "Baggage not included"}
                          </div>
                        </div>
                      </div>

                      <p className="text-yovu-charcoal/80 mb-4">{flight.description}</p>

                      <div className="mb-4 bg-yovu-mint/10 p-3 rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <div className="font-medium">{flight.airline}</div>
                            <div className="text-sm text-yovu-charcoal/70">
                              {flight.stops === 0 ? "Direct" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`} •{" "}
                              {flight.cabinClass?.charAt(0).toUpperCase() +
                                flight.cabinClass?.slice(1).replace("-", " ")}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{flight.duration}</div>
                            <div className="text-sm text-yovu-charcoal/70">
                              {flight.departureTime} - {flight.arrivalTime}
                            </div>
                          </div>
                        </div>

                        {tripType === "round-trip" && (
                          <div className="mt-3 pt-3 border-t border-yovu-mint/30">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">Return Flight</div>
                                <div className="text-sm text-yovu-charcoal/70">
                                  {flight.stops === 0 ? "Direct" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">{flight.duration}</div>
                                <div className="text-sm text-yovu-charcoal/70">
                                  {flight.departureTime} - {flight.arrivalTime}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {flight.sustainabilityFeatures.map((feature: string, index: number) => (
                          <Badge key={index} className="bg-yovu-charcoal text-white">
                            <Leaf className="h-3 w-3 mr-1" />
                            {feature
                              .split("-")
                              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(" ")}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-sm text-yovu-charcoal/70">{flight.location}</div>
                        <div className="flex gap-2">
                          <Button variant="outline" className="border-yovu-charcoal text-yovu-charcoal">
                            View Details
                          </Button>
                          <Button className="bg-yovu-charcoal text-white hover:bg-yovu-charcoal/90">
                            <Plus className="h-4 w-4 mr-2" /> Add to Journey
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
