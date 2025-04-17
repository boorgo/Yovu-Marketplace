"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Plane, Clock, Leaf, ArrowUpDown } from "lucide-react"
import { format, addMinutes } from "date-fns"
import type { mockFlightResults } from "@/lib/mock-flight-results"
import { useJourney } from "@/lib/journey-context"

type SortOption = "sustainability" | "price-low" | "price-high" | "duration"

interface FlightResultsProps {
  flights: typeof mockFlightResults
  loading: boolean
  origin: string
  destination: string
  departureDate?: Date
  returnDate?: Date
  cabinClass: string
}

export function FlightResults({
  flights,
  loading,
  origin,
  destination,
  departureDate,
  returnDate,
  cabinClass,
}: FlightResultsProps) {
  const router = useRouter()
  const { addFlightToJourney } = useJourney()
  const [sortOption, setSortOption] = useState<SortOption>("sustainability")

  const handleSortChange = (value: string) => {
    setSortOption(value as SortOption)
  }

  const getSortedFlights = () => {
    switch (sortOption) {
      case "sustainability":
        return [...flights].sort((a, b) => b.sustainabilityScore - a.sustainabilityScore)
      case "price-low":
        return [...flights].sort((a, b) => a.price - b.price)
      case "price-high":
        return [...flights].sort((a, b) => b.price - a.price)
      case "duration":
        return [...flights].sort((a, b) => a.durationMinutes - b.durationMinutes)
      default:
        return flights
    }
  }

  const handleSelectFlight = (flight: (typeof mockFlightResults)[0]) => {
    // Add flight to journey
    addFlightToJourney({
      id: flight.id,
      type: "flight",
      origin,
      destination,
      departureDate,
      returnDate,
      departureTime: flight.departureTime,
      arrivalTime: flight.arrivalTime,
      airline: flight.airline,
      flightNumber: flight.flightNumber,
      price: flight.price,
      cabinClass,
      sustainabilityScore: flight.sustainabilityScore,
      sustainabilityFeatures: flight.sustainabilityFeatures,
      carbonSaved: flight.carbonSaved,
    })

    // Navigate to next step (accommodations)
    router.push("/journey/accommodations")
  }

  const sortedFlights = getSortedFlights()

  if (loading) {
    return (
      <Card className="border-yovu-mint">
        <CardHeader className="bg-yovu-mint/30">
          <div className="flex justify-between items-center">
            <CardTitle className="text-yovu-charcoal">Finding the best sustainable flights...</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-yovu-mint/30 rounded-md p-4">
                <div className="flex justify-between mb-4">
                  <Skeleton className="h-8 w-40" />
                  <Skeleton className="h-8 w-20" />
                </div>
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-yovu-mint/30 flex justify-between">
                  <div className="flex space-x-2">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                  <Skeleton className="h-10 w-32" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-yovu-mint">
      <CardHeader className="bg-yovu-mint/30">
        <div className="flex justify-between items-center">
          <CardTitle className="text-yovu-charcoal">
            {flights.length} {flights.length === 1 ? "flight" : "flights"} found
          </CardTitle>

          <div className="flex items-center">
            <ArrowUpDown className="mr-2 h-4 w-4 text-yovu-charcoal" />
            <Select defaultValue={sortOption} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px] border-yovu-charcoal/30 bg-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sustainability">Sustainability Score</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="duration">Duration</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {sortedFlights.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-yovu-charcoal/70">No flights found matching your criteria.</p>
            <p className="text-yovu-charcoal/70 mt-2">Try adjusting your filters or search parameters.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedFlights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} onSelect={() => handleSelectFlight(flight)} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface FlightCardProps {
  flight: (typeof mockFlightResults)[0]
  onSelect: () => void
}

function FlightCard({ flight, onSelect }: FlightCardProps) {
  // Calculate arrival time based on departure time and duration
  const departureDate = new Date(`2023-01-01T${flight.departureTime}:00`)
  const arrivalDate = addMinutes(departureDate, flight.durationMinutes)
  const arrivalTime = format(arrivalDate, "HH:mm")

  // Format duration
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  // Get sustainability score color
  const getSustainabilityColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-orange-600"
  }

  return (
    <div className="border border-yovu-mint rounded-md p-4 hover:border-yovu-charcoal transition-colors">
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-yovu-mint/30 rounded-full flex items-center justify-center mr-2">
            <Plane className="h-4 w-4 text-yovu-charcoal" />
          </div>
          <span className="font-medium text-yovu-charcoal">{flight.airline}</span>
          <span className="text-sm text-yovu-charcoal/70 ml-2">{flight.flightNumber}</span>
        </div>

        <div className={`font-bold text-lg ${getSustainabilityColor(flight.sustainabilityScore)}`}>
          {flight.sustainabilityScore}/100
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-center">
          <div className="text-xl font-bold text-yovu-charcoal">{flight.departureTime}</div>
          <div className="text-sm text-yovu-charcoal/70">Departure</div>
        </div>

        <div className="flex-1 px-4">
          <div className="relative">
            <div className="border-t-2 border-dashed border-yovu-mint/50 mx-2"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-yovu-charcoal/70 mr-1" />
                <span className="text-sm text-yovu-charcoal/70">{formatDuration(flight.durationMinutes)}</span>
              </div>
            </div>
          </div>
          <div className="text-center mt-1">
            <span className="text-xs text-yovu-charcoal/70">
              {flight.stops === 0 ? "Direct" : `${flight.stops} ${flight.stops === 1 ? "stop" : "stops"}`}
            </span>
          </div>
        </div>

        <div className="text-center">
          <div className="text-xl font-bold text-yovu-charcoal">{arrivalTime}</div>
          <div className="text-sm text-yovu-charcoal/70">Arrival</div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-yovu-mint/30 flex justify-between items-center">
        <div className="flex flex-wrap gap-2">
          {flight.sustainabilityFeatures.map((feature) => (
            <Badge key={feature} className="bg-yovu-mint/30 text-yovu-charcoal border-none flex items-center">
              <Leaf className="h-3 w-3 mr-1" />
              {formatFeature(feature)}
            </Badge>
          ))}
        </div>

        <div className="flex items-center">
          <div className="text-right mr-4">
            <div className="text-sm text-yovu-charcoal/70">Price</div>
            <div className="text-xl font-bold text-yovu-charcoal">${flight.price}</div>
          </div>

          <Button onClick={onSelect} className="bg-yovu-charcoal text-white">
            Select <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function formatFeature(feature: string): string {
  switch (feature) {
    case "carbon-offset":
      return "Carbon Offset"
    case "eco-friendly-airlines":
      return "Eco-Friendly Airline"
    case "sustainable-fuel":
      return "Sustainable Fuel"
    case "direct-flight":
      return "Direct Flight"
    default:
      return feature
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
  }
}
