"use client"

import { memo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Star, Plus, Leaf, Clock, Plane, Bed, Utensils, Car, Bike, Check, Trash } from "lucide-react"
import type { JourneyResult } from "@/lib/mock-journey-results"
import { useJourneyBuilder } from "@/lib/journey-builder-context"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface JourneyResultsProps {
  results: JourneyResult[]
  loading: boolean
  activeTab: string
}

// Use memo to prevent unnecessary re-renders
export const JourneyResults = memo(function JourneyResults({ results, loading, activeTab }: JourneyResultsProps) {
  if (loading) {
    return <JourneyResultsSkeletons />
  }

  if (results.length === 0) {
    return (
      <Card className="p-6 text-center">
        <h3 className="text-lg font-medium mb-2">No results found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or search criteria to find more options.</p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-yovu-charcoal">
          {results.length} {activeTab !== "all" ? activeTab : "sustainable"} options
        </h2>
      </div>

      {results.map((result) => (
        <JourneyResultCard key={result.id} result={result} />
      ))}
    </div>
  )
})

// Separate skeleton component
function JourneyResultsSkeletons() {
  return (
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
  )
}

// Separate result card component
const JourneyResultCard = memo(function JourneyResultCard({ result }: { result: JourneyResult }) {
  const { selectedItems, addItem, removeItem } = useJourneyBuilder()
  const isSelected = selectedItems.some((item) => item.id === result.id)

  // Get the appropriate icon for each service type
  const getServiceIcon = (type: string) => {
    switch (type) {
      case "flight":
        return <Plane className="h-5 w-5" />
      case "accommodation":
        return <Bed className="h-5 w-5" />
      case "activity":
        return <Bike className="h-5 w-5" />
      case "restaurant":
        return <Utensils className="h-5 w-5" />
      case "transportation":
        return <Car className="h-5 w-5" />
      default:
        return <Leaf className="h-5 w-5" />
    }
  }

  return (
    <Card
      className={`overflow-hidden border-yovu-mint hover:shadow-md transition-shadow ${isSelected ? "ring-2 ring-yovu-mint" : ""}`}
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 relative">
          <img
            src={result.image || "/placeholder.svg"}
            alt={result.title}
            className="h-48 md:h-full w-full object-cover"
          />
          <Badge className="absolute top-2 right-2 bg-yovu-charcoal">{result.sustainabilityScore}% Sustainable</Badge>
          {isSelected && (
            <div className="absolute top-2 left-2">
              <Badge className="bg-yovu-mint text-yovu-charcoal">
                <Check className="h-3 w-3 mr-1" /> Added to Journey
              </Badge>
            </div>
          )}
        </div>

        <div className="flex-1 p-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="bg-yovu-mint/20 text-yovu-charcoal border-yovu-mint">
                  <span className="flex items-center gap-1">
                    {getServiceIcon(result.type)}
                    {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                  </span>
                </Badge>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="ml-1 text-sm font-medium">{result.rating}</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-yovu-charcoal">{result.title}</h3>
            </div>
            <div className="text-right">
              <div className="text-sm text-yovu-charcoal/70">from</div>
              <div className="text-xl font-bold text-yovu-charcoal">
                {result.currency} {result.price}
              </div>
            </div>
          </div>

          <p className="text-yovu-charcoal/80 mb-4">{result.description}</p>

          {/* Flight-specific information */}
          {result.type === "flight" && (
            <div className="mb-4 bg-yovu-mint/10 p-3 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <div className="font-medium">{result.airline}</div>
                  <div className="text-sm text-yovu-charcoal/70">
                    {result.stops === 0 ? "Direct" : `${result.stops} stop${result.stops > 1 ? "s" : ""}`} •{" "}
                    {result.cabinClass?.charAt(0).toUpperCase() + result.cabinClass?.slice(1)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{result.duration}</div>
                  <div className="text-sm text-yovu-charcoal/70">
                    {result.departureTime} - {result.arrivalTime}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Accommodation-specific information */}
          {result.type === "accommodation" && result.amenities && (
            <div className="mb-4">
              <div className="text-sm text-yovu-charcoal/70">
                Check-in: {result.checkIn} • Check-out: {result.checkOut}
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {result.amenities.slice(0, 3).map((amenity, index) => (
                  <Badge key={index} variant="outline" className="bg-yovu-mint/10 border-yovu-mint/30">
                    {amenity}
                  </Badge>
                ))}
                {result.amenities.length > 3 && (
                  <Badge variant="outline" className="bg-yovu-mint/10 border-yovu-mint/30">
                    +{result.amenities.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Activity-specific information */}
          {result.type === "activity" && result.duration_hours && (
            <div className="mb-4">
              <div className="flex items-center text-yovu-charcoal/70">
                <Clock className="h-4 w-4 mr-1" />
                <span>
                  {result.duration_hours} hour{result.duration_hours > 1 ? "s" : ""}
                </span>
              </div>
              {result.included && (
                <div className="text-sm text-yovu-charcoal/70 mt-1">Includes: {result.included.join(", ")}</div>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-4">
            {result.sustainabilityFeatures.map((feature, index) => (
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
            <div className="text-sm text-yovu-charcoal/70">{result.location}</div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  {isSelected ? (
                    <Button
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                      onClick={() => removeItem(result.id)}
                    >
                      <Trash className="h-4 w-4 mr-2" /> Remove from Journey
                    </Button>
                  ) : (
                    <Button
                      className="bg-yovu-charcoal text-white hover:bg-yovu-charcoal/90"
                      onClick={() => addItem(result)}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add to Journey
                    </Button>
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  {isSelected ? "Remove this item from your journey" : "Add this item to your journey"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </Card>
  )
})
