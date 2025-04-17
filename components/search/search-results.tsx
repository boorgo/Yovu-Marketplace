"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Star, ArrowUpDown, Check, Plus, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for demonstration
import { mockResults } from "@/lib/mock-results"
import { useJourney } from "@/lib/journey-context"

type SortOption = "impact" | "price-low" | "price-high" | "rating"

export function SearchResults() {
  const searchParams = useSearchParams()
  const [results, setResults] = useState(mockResults)
  const [activeTab, setActiveTab] = useState("all")
  const [sortOption, setSortOption] = useState<SortOption>("impact")
  const { addToJourney } = useJourney()

  // Filter and sort results based on search params and sort option
  useEffect(() => {
    let filteredResults = [...mockResults]

    // Filter by type if not "all"
    const typeParam = searchParams.get("type")
    if (typeParam && typeParam !== "all") {
      filteredResults = filteredResults.filter((item) => item.type === typeParam)
    }

    // Apply destination filter if provided
    const destinationParam = searchParams.get("destination")
    if (destinationParam) {
      filteredResults = filteredResults.filter((item) =>
        item.location.toLowerCase().includes(destinationParam.toLowerCase()),
      )
    }

    // Apply sustainability filters if provided
    const sustainabilityParam = searchParams.get("sustainability")
    if (sustainabilityParam) {
      const filters = sustainabilityParam.split(",")
      filteredResults = filteredResults.filter((item) =>
        filters.some((filter) => item.sustainabilityFeatures.includes(filter)),
      )
    }

    // Apply sorting
    filteredResults = sortResults(filteredResults, sortOption)

    setResults(filteredResults)
  }, [searchParams, sortOption])

  const sortResults = (items: typeof mockResults, option: SortOption) => {
    switch (option) {
      case "impact":
        return [...items].sort((a, b) => b.impactScore - a.impactScore)
      case "price-low":
        return [...items].sort((a, b) => a.price - b.price)
      case "price-high":
        return [...items].sort((a, b) => b.price - a.price)
      case "rating":
        return [...items].sort((a, b) => b.rating - a.rating)
      default:
        return items
    }
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-yovu-mint p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-yovu-charcoal">{results.length} Sustainable Options Found</h2>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-yovu-charcoal text-yovu-charcoal">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Sort By: {getSortLabel(sortOption)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSortOption("impact")}>
              {sortOption === "impact" && <Check className="mr-2 h-4 w-4" />}
              Highest Impact
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOption("price-low")}>
              {sortOption === "price-low" && <Check className="mr-2 h-4 w-4" />}
              Price: Low to High
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOption("price-high")}>
              {sortOption === "price-high" && <Check className="mr-2 h-4 w-4" />}
              Price: High to Low
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOption("rating")}>
              {sortOption === "rating" && <Check className="mr-2 h-4 w-4" />}
              Highest Rated
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-6 bg-yovu-mint">
          <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-yovu-charcoal">
            All
          </TabsTrigger>
          <TabsTrigger
            value="accommodations"
            className="data-[state=active]:bg-white data-[state=active]:text-yovu-charcoal"
          >
            Accommodations
          </TabsTrigger>
          <TabsTrigger
            value="activities"
            className="data-[state=active]:bg-white data-[state=active]:text-yovu-charcoal"
          >
            Activities
          </TabsTrigger>
          <TabsTrigger
            value="restaurants"
            className="data-[state=active]:bg-white data-[state=active]:text-yovu-charcoal"
          >
            Restaurants
          </TabsTrigger>
          <TabsTrigger
            value="transportation"
            className="data-[state=active]:bg-white data-[state=active]:text-yovu-charcoal"
          >
            Transportation
          </TabsTrigger>
          <TabsTrigger value="flights" className="data-[state=active]:bg-white data-[state=active]:text-yovu-charcoal">
            Flights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0 space-y-6">
          {results.map((item) => (
            <ResultCard key={item.id} result={item} onAddToJourney={() => addToJourney(item)} />
          ))}
          {results.length === 0 && (
            <div className="text-center py-8 text-yovu-charcoal/70">
              No results found. Try adjusting your search filters.
            </div>
          )}
        </TabsContent>

        {["accommodations", "activities", "restaurants", "transportation", "flights"].map((type) => (
          <TabsContent key={type} value={type} className="mt-0 space-y-6">
            {results
              .filter((item) => item.type === type)
              .map((item) => (
                <ResultCard key={item.id} result={item} onAddToJourney={() => addToJourney(item)} />
              ))}
            {results.filter((item) => item.type === type).length === 0 && (
              <div className="text-center py-8 text-yovu-charcoal/70">
                No {type} found. Try adjusting your search filters.
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function getSortLabel(option: SortOption): string {
  switch (option) {
    case "impact":
      return "Highest Impact"
    case "price-low":
      return "Price: Low to High"
    case "price-high":
      return "Price: High to Low"
    case "rating":
      return "Highest Rated"
  }
}

interface ResultCardProps {
  result: (typeof mockResults)[0]
  onAddToJourney: () => void
}

function ResultCard({ result, onAddToJourney }: ResultCardProps) {
  return (
    <div className="flex flex-col md:flex-row border border-yovu-mint rounded-lg overflow-hidden">
      <div className="w-full md:w-1/3 h-48 md:h-auto relative">
        <img src={result.image || "/placeholder.svg"} alt={result.title} className="h-full w-full object-cover" />
        <Badge className="absolute top-3 left-3 bg-yovu-charcoal text-white">{getTypeLabel(result.type)}</Badge>
      </div>

      <div className="flex-1 p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-yovu-charcoal">{result.title}</h3>
            <p className="text-yovu-charcoal/70 mb-2">{result.location}</p>
          </div>
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <span className="ml-1 text-yovu-charcoal font-medium">{result.rating.toFixed(1)}</span>
          </div>
        </div>

        <p className="text-yovu-charcoal/80 mb-4">{result.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {result.sustainabilityFeatures.map((feature) => (
            <Badge key={feature} variant="outline" className="bg-yovu-mint/30 text-yovu-charcoal border-yovu-mint">
              {feature}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
          <div className="grid grid-cols-3 gap-4 w-full md:w-auto">
            <ImpactMetric
              label="Carbon"
              value={result.carbonSaved}
              unit="kg"
              tooltip="Carbon emissions saved compared to conventional options"
            />
            <ImpactMetric
              label="Nature"
              value={result.natureImpact}
              unit="%"
              tooltip="Positive impact on biodiversity and natural habitats"
            />
            <ImpactMetric
              label="Community"
              value={result.communityImpact}
              unit="$"
              tooltip="Direct financial benefit to local communities"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-yovu-charcoal/70">{getPriceLabel(result.type)}</div>
              <div className="text-xl font-bold text-yovu-charcoal">${result.price}</div>
            </div>
            <Button onClick={onAddToJourney} className="bg-yovu-charcoal text-white whitespace-nowrap">
              <Plus className="mr-2 h-4 w-4" /> Add to Journey
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ImpactMetricProps {
  label: string
  value: number
  unit: string
  tooltip: string
}

function ImpactMetric({ label, value, unit, tooltip }: ImpactMetricProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="text-center bg-yovu-mint/20 p-2 rounded-md">
            <div className="text-sm text-yovu-charcoal/70 flex items-center justify-center">
              {label} <Info className="ml-1 h-3 w-3" />
            </div>
            <div className="font-bold text-yovu-charcoal">
              {value}
              {unit}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function getTypeLabel(type: string): string {
  switch (type) {
    case "accommodations":
      return "Stay"
    case "activities":
      return "Activity"
    case "restaurants":
      return "Dining"
    case "transportation":
      return "Transport"
    case "flights":
      return "Flight"
    default:
      return type
  }
}

function getPriceLabel(type: string): string {
  switch (type) {
    case "accommodations":
      return "per night"
    case "activities":
      return "per person"
    case "restaurants":
      return "avg. meal"
    case "transportation":
      return "per day"
    case "flights":
      return "per ticket"
    default:
      return ""
  }
}
