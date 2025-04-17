"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Leaf, Star, Plus, Info, Bed, Utensils, Bike, Car, Plane } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useJourney } from "@/lib/journey-context"
import type { mockDestinationData } from "@/lib/mock-destination-data"

interface DestinationResultsProps {
  results: typeof mockDestinationData
  loading: boolean
}

export function DestinationResults({ results, loading }: DestinationResultsProps) {
  const { addToJourney } = useJourney()

  if (loading) {
    return (
      <Card className="border-yovu-mint">
        <CardHeader className="bg-yovu-mint/30">
          <CardTitle className="text-yovu-charcoal">Finding sustainable options...</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-yovu-mint/30 rounded-md p-4">
                <div className="flex justify-between mb-4">
                  <Skeleton className="h-8 w-40" />
                  <Skeleton className="h-8 w-20" />
                </div>
                <div className="flex gap-4">
                  <Skeleton className="h-32 w-32 rounded-md" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
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
        <CardTitle className="text-yovu-charcoal">{results.length} sustainable options found</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {results.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-yovu-charcoal/70">No results found matching your criteria.</p>
            <p className="text-yovu-charcoal/70 mt-2">Try adjusting your filters or search parameters.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {results.map((item) => (
              <ResultCard key={item.id} result={item} onAddToJourney={() => addToJourney(item)} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface ResultCardProps {
  result: (typeof mockDestinationData)[0]
  onAddToJourney: () => void
}

function ResultCard({ result, onAddToJourney }: ResultCardProps) {
  // Get service type icon
  const getTypeIcon = () => {
    switch (result.type) {
      case "accommodation":
        return <Bed className="h-4 w-4" />
      case "activity":
        return <Bike className="h-4 w-4" />
      case "restaurant":
        return <Utensils className="h-4 w-4" />
      case "transportation":
        return <Car className="h-4 w-4" />
      case "flight":
        return <Plane className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  // Get sustainability score color
  const getSustainabilityColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-orange-600"
  }

  // Format price label based on type
  const getPriceLabel = () => {
    switch (result.type) {
      case "accommodation":
        return "per night"
      case "activity":
        return "per person"
      case "restaurant":
        return "avg. meal"
      case "transportation":
        return "per day"
      case "flight":
        return "per ticket"
      default:
        return ""
    }
  }

  return (
    <div className="border border-yovu-mint rounded-md p-4 hover:border-yovu-charcoal transition-colors">
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <Badge className="mr-2 bg-yovu-charcoal text-white flex items-center">
            {getTypeIcon()}
            <span className="ml-1">{result.type.charAt(0).toUpperCase() + result.type.slice(1)}</span>
          </Badge>
          <span className="text-sm text-yovu-charcoal/70">{result.location}</span>
        </div>

        <div className={`font-bold text-lg ${getSustainabilityColor(result.sustainabilityScore)}`}>
          {result.sustainabilityScore}/100
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-32 h-32 rounded-md overflow-hidden">
          <img src={result.image || "/placeholder.svg"} alt={result.title} className="w-full h-full object-cover" />
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-yovu-charcoal text-lg">{result.title}</h3>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="ml-1 text-yovu-charcoal">{result.rating.toFixed(1)}</span>
            </div>
          </div>

          <p className="text-yovu-charcoal/80 text-sm mt-1 line-clamp-2">{result.description}</p>

          <div className="flex flex-wrap gap-2 mt-3">
            {result.sustainabilityFeatures.map((feature) => (
              <Badge key={feature} className="bg-yovu-mint/30 text-yovu-charcoal border-none flex items-center">
                <Leaf className="h-3 w-3 mr-1" />
                {formatFeature(feature)}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-yovu-mint/30 flex justify-between items-center">
        <div className="grid grid-cols-3 gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-center bg-yovu-mint/20 p-2 rounded-md">
                  <div className="text-xs text-yovu-charcoal/70">Carbon</div>
                  <div className="font-medium text-yovu-charcoal">{result.carbonSaved}kg</div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Carbon emissions saved compared to conventional options</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-center bg-yovu-mint/20 p-2 rounded-md">
                  <div className="text-xs text-yovu-charcoal/70">Nature</div>
                  <div className="font-medium text-yovu-charcoal">{result.natureImpact}%</div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Positive impact on biodiversity and natural habitats</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-center bg-yovu-mint/20 p-2 rounded-md">
                  <div className="text-xs text-yovu-charcoal/70">Community</div>
                  <div className="font-medium text-yovu-charcoal">${result.communityImpact}</div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Direct financial benefit to local communities</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center">
          <div className="text-right mr-4">
            <div className="text-sm text-yovu-charcoal/70">{getPriceLabel()}</div>
            <div className="text-xl font-bold text-yovu-charcoal">${result.price}</div>
          </div>

          <Button onClick={onAddToJourney} className="bg-yovu-charcoal text-white">
            <Plus className="mr-2 h-4 w-4" /> Add to Journey
          </Button>
        </div>
      </div>
    </div>
  )
}

function formatFeature(feature: string): string {
  return feature
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}
