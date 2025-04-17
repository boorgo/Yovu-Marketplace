"use client"

import { format } from "date-fns"
import { MapPin, Calendar, Users, Plane } from "lucide-react"

interface SearchSummaryStepProps {
  searchData: {
    origin: string
    destination: string
    departureDate: Date | undefined
    returnDate: Date | undefined
    tripType: "round-trip" | "one-way"
    travelers: {
      adults: number
      children: number
      infants: number
    }
    cabinClass: string
    directFlightsOnly: boolean
  }
}

export function SearchSummaryStep({ searchData }: SearchSummaryStepProps) {
  const totalTravelers = searchData.travelers.adults + searchData.travelers.children + searchData.travelers.infants

  return (
    <div className="space-y-6">
      <div className="p-4 bg-yovu-mint/20 rounded-md">
        <h3 className="font-medium text-lg text-yovu-charcoal mb-4">Journey Summary</h3>

        <div className="space-y-4">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-yovu-charcoal mr-3 mt-0.5" />
            <div>
              <p className="text-sm text-yovu-charcoal/70">From</p>
              <p className="font-medium text-yovu-charcoal">{searchData.origin}</p>
            </div>
          </div>

          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-yovu-charcoal mr-3 mt-0.5" />
            <div>
              <p className="text-sm text-yovu-charcoal/70">To</p>
              <p className="font-medium text-yovu-charcoal">{searchData.destination}</p>
            </div>
          </div>

          <div className="flex items-start">
            <Calendar className="h-5 w-5 text-yovu-charcoal mr-3 mt-0.5" />
            <div>
              <p className="text-sm text-yovu-charcoal/70">Dates</p>
              <p className="font-medium text-yovu-charcoal">
                {searchData.departureDate ? format(searchData.departureDate, "EEE, MMM d, yyyy") : "Not selected"}
                {searchData.tripType === "round-trip" && searchData.returnDate && (
                  <> - {format(searchData.returnDate, "EEE, MMM d, yyyy")}</>
                )}
              </p>
              <p className="text-sm text-yovu-charcoal/70">
                {searchData.tripType === "round-trip" ? "Round trip" : "One way"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-yovu-mint/20 rounded-md">
        <h3 className="font-medium text-lg text-yovu-charcoal mb-4">Flight Details</h3>

        <div className="space-y-4">
          <div className="flex items-start">
            <Users className="h-5 w-5 text-yovu-charcoal mr-3 mt-0.5" />
            <div>
              <p className="text-sm text-yovu-charcoal/70">Travelers</p>
              <p className="font-medium text-yovu-charcoal">
                {totalTravelers} {totalTravelers === 1 ? "traveler" : "travelers"}
              </p>
              <p className="text-sm text-yovu-charcoal/70">
                {searchData.travelers.adults} {searchData.travelers.adults === 1 ? "adult" : "adults"}
                {searchData.travelers.children > 0 &&
                  `, ${searchData.travelers.children} ${searchData.travelers.children === 1 ? "child" : "children"}`}
                {searchData.travelers.infants > 0 &&
                  `, ${searchData.travelers.infants} ${searchData.travelers.infants === 1 ? "infant" : "infants"}`}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <Plane className="h-5 w-5 text-yovu-charcoal mr-3 mt-0.5" />
            <div>
              <p className="text-sm text-yovu-charcoal/70">Cabin class</p>
              <p className="font-medium text-yovu-charcoal">
                {searchData.cabinClass.charAt(0).toUpperCase() + searchData.cabinClass.slice(1).replace("-", " ")}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <Plane className="h-5 w-5 text-yovu-charcoal mr-3 mt-0.5" />
            <div>
              <p className="text-sm text-yovu-charcoal/70">Flight options</p>
              <p className="font-medium text-yovu-charcoal">
                {searchData.directFlightsOnly ? "Direct flights only" : "All flights (including connections)"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
