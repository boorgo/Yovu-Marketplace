"use client"

import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Users, MapPin, Leaf, DollarSign } from "lucide-react"
import Link from "next/link"
import type { SearchConfig } from "./journey-results-container"

interface JourneyResultsHeaderProps {
  searchConfig: SearchConfig
}

export function JourneyResultsHeader({ searchConfig }: JourneyResultsHeaderProps) {
  // Format a preference for display
  const formatPreference = (pref: string) => {
    return pref
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div className="bg-yovu-charcoal text-white py-6">
      <div className="container">
        <div className="flex items-center mb-4">
          <Link href="/design-journey">
            <Button variant="ghost" className="text-white hover:bg-yovu-charcoal/20 p-0 h-auto">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to journey builder
            </Button>
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-4">Sustainable Options for {searchConfig.destination}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-yovu-charcoal/30 p-4 rounded-lg">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-yovu-mint" />
            <div>
              <div className="text-sm text-yovu-mint/80">Destination</div>
              <div className="font-medium">{searchConfig.destination}</div>
            </div>
          </div>

          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-yovu-mint" />
            <div>
              <div className="text-sm text-yovu-mint/80">Dates</div>
              <div className="font-medium">
                {searchConfig.startDate ? format(searchConfig.startDate, "MMM d, yyyy") : "Any date"}
                {searchConfig.endDate ? ` - ${format(searchConfig.endDate, "MMM d, yyyy")}` : ""}
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-yovu-mint" />
            <div>
              <div className="text-sm text-yovu-mint/80">Travelers</div>
              <div className="font-medium">
                {searchConfig.travelers} {searchConfig.travelers === 1 ? "traveler" : "travelers"}
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-yovu-mint" />
            <div>
              <div className="text-sm text-yovu-mint/80">Budget</div>
              <div className="font-medium">
                ${searchConfig.budget[0]} - ${searchConfig.budget[1]}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center mb-2">
            <Leaf className="h-4 w-4 mr-2 text-yovu-mint" />
            <span className="text-sm text-yovu-mint/80">
              Sustainability Priority: {searchConfig.sustainabilityLevel}%
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {searchConfig.activityPreferences.length > 0 && (
              <div className="bg-white/10 px-3 py-1 rounded-full text-sm">
                Activities: {searchConfig.activityPreferences.length}
              </div>
            )}

            {searchConfig.accommodationTypes.length > 0 && (
              <div className="bg-white/10 px-3 py-1 rounded-full text-sm">
                Accommodations: {searchConfig.accommodationTypes.length}
              </div>
            )}

            {searchConfig.diningPreferences.length > 0 && (
              <div className="bg-white/10 px-3 py-1 rounded-full text-sm">
                Dining: {searchConfig.diningPreferences.length}
              </div>
            )}

            {searchConfig.transportationTypes.length > 0 && (
              <div className="bg-white/10 px-3 py-1 rounded-full text-sm">
                Transportation: {searchConfig.transportationTypes.length}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
