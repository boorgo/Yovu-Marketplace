"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { CalendarIcon, MapPin, Users, Plane, Hotel, Utensils, Car, Bike } from "lucide-react"
import { cn } from "@/lib/utils"

type SearchTab = "all" | "accommodations" | "activities" | "restaurants" | "transportation" | "flights"

export function SearchInterface() {
  const router = useRouter()
  const [searchTab, setSearchTab] = useState<SearchTab>("all")
  const [destination, setDestination] = useState("")
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })
  const [travelers, setTravelers] = useState("2")
  const [searchQuery, setSearchQuery] = useState("")

  // Sustainability filters
  const [sustainabilityFilters, setSustainabilityFilters] = useState<string[]>([])

  const handleAddFilter = (filter: string) => {
    if (sustainabilityFilters.includes(filter)) {
      setSustainabilityFilters(sustainabilityFilters.filter((f) => f !== filter))
    } else {
      setSustainabilityFilters([...sustainabilityFilters, filter])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const searchParams = new URLSearchParams()

    if (destination) searchParams.append("destination", destination)
    if (dateRange.from) searchParams.append("from", dateRange.from.toISOString())
    if (dateRange.to) searchParams.append("to", dateRange.to.toISOString())
    searchParams.append("travelers", travelers)
    searchParams.append("type", searchTab)
    if (searchQuery) searchParams.append("query", searchQuery)
    if (sustainabilityFilters.length > 0) searchParams.append("sustainability", sustainabilityFilters.join(","))

    router.push(`/search-results?${searchParams.toString()}`)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-yovu-mint">
      <Tabs defaultValue="all" onValueChange={(value) => setSearchTab(value as SearchTab)}>
        <TabsList className="grid grid-cols-6 mb-6 bg-yovu-mint">
          <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-yovu-charcoal">
            <span className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              All
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="accommodations"
            className="data-[state=active]:bg-white data-[state=active]:text-yovu-charcoal"
          >
            <span className="flex items-center">
              <Hotel className="mr-2 h-4 w-4" />
              Stay
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="activities"
            className="data-[state=active]:bg-white data-[state=active]:text-yovu-charcoal"
          >
            <span className="flex items-center">
              <Bike className="mr-2 h-4 w-4" />
              Do
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="restaurants"
            className="data-[state=active]:bg-white data-[state=active]:text-yovu-charcoal"
          >
            <span className="flex items-center">
              <Utensils className="mr-2 h-4 w-4" />
              Eat
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
          <TabsTrigger value="flights" className="data-[state=active]:bg-white data-[state=active]:text-yovu-charcoal">
            <span className="flex items-center">
              <Plane className="mr-2 h-4 w-4" />
              Fly
            </span>
          </TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-yovu-charcoal mb-1">
                Destination
              </label>
              <Input
                id="destination"
                placeholder="Where are you going?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="bg-white border-yovu-mint"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-yovu-charcoal mb-1">Dates</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal border-yovu-mint",
                      !dateRange.from && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Select date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={(range) => setDateRange(range || { from: undefined, to: undefined })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="block text-sm font-medium text-yovu-charcoal mb-1">Travelers</label>
              <Select defaultValue="2" onValueChange={setTravelers}>
                <SelectTrigger className="border-yovu-mint">
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Number of travelers" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 traveler</SelectItem>
                  <SelectItem value="2">2 travelers</SelectItem>
                  <SelectItem value="3">3 travelers</SelectItem>
                  <SelectItem value="4">4 travelers</SelectItem>
                  <SelectItem value="5">5+ travelers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="searchQuery" className="block text-sm font-medium text-yovu-charcoal mb-1">
                Keywords
              </label>
              <Input
                id="searchQuery"
                placeholder="Search keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white border-yovu-mint"
              />
            </div>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="bg-yovu-mint/20 p-4 rounded-md mb-4">
              <h3 className="text-sm font-medium text-yovu-charcoal mb-2">Sustainability Filters</h3>
              <div className="flex flex-wrap gap-2">
                <SustainabilityFilter
                  label="Carbon Neutral"
                  active={sustainabilityFilters.includes("carbon-neutral")}
                  onClick={() => handleAddFilter("carbon-neutral")}
                />
                <SustainabilityFilter
                  label="Eco-Certified"
                  active={sustainabilityFilters.includes("eco-certified")}
                  onClick={() => handleAddFilter("eco-certified")}
                />
                <SustainabilityFilter
                  label="Locally Owned"
                  active={sustainabilityFilters.includes("locally-owned")}
                  onClick={() => handleAddFilter("locally-owned")}
                />
                <SustainabilityFilter
                  label="Plastic-Free"
                  active={sustainabilityFilters.includes("plastic-free")}
                  onClick={() => handleAddFilter("plastic-free")}
                />
                <SustainabilityFilter
                  label="Renewable Energy"
                  active={sustainabilityFilters.includes("renewable-energy")}
                  onClick={() => handleAddFilter("renewable-energy")}
                />
                <SustainabilityFilter
                  label="Community Support"
                  active={sustainabilityFilters.includes("community-support")}
                  onClick={() => handleAddFilter("community-support")}
                />
                <SustainabilityFilter
                  label="Wildlife Protection"
                  active={sustainabilityFilters.includes("wildlife-protection")}
                  onClick={() => handleAddFilter("wildlife-protection")}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="accommodations" className="mt-0">
            <div className="bg-yovu-mint/20 p-4 rounded-md mb-4">
              <h3 className="text-sm font-medium text-yovu-charcoal mb-2">Accommodation Filters</h3>
              <div className="flex flex-wrap gap-2">
                <SustainabilityFilter
                  label="Solar Powered"
                  active={sustainabilityFilters.includes("solar-powered")}
                  onClick={() => handleAddFilter("solar-powered")}
                />
                <SustainabilityFilter
                  label="Rainwater Harvesting"
                  active={sustainabilityFilters.includes("rainwater-harvesting")}
                  onClick={() => handleAddFilter("rainwater-harvesting")}
                />
                <SustainabilityFilter
                  label="Eco-Certified"
                  active={sustainabilityFilters.includes("eco-certified")}
                  onClick={() => handleAddFilter("eco-certified")}
                />
                <SustainabilityFilter
                  label="Farm-to-Table"
                  active={sustainabilityFilters.includes("farm-to-table")}
                  onClick={() => handleAddFilter("farm-to-table")}
                />
                <SustainabilityFilter
                  label="Energy Efficient"
                  active={sustainabilityFilters.includes("energy-efficient")}
                  onClick={() => handleAddFilter("energy-efficient")}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activities" className="mt-0">
            <div className="bg-yovu-mint/20 p-4 rounded-md mb-4">
              <h3 className="text-sm font-medium text-yovu-charcoal mb-2">Activity Filters</h3>
              <div className="flex flex-wrap gap-2">
                <SustainabilityFilter
                  label="Leave No Trace"
                  active={sustainabilityFilters.includes("leave-no-trace")}
                  onClick={() => handleAddFilter("leave-no-trace")}
                />
                <SustainabilityFilter
                  label="Local Guides"
                  active={sustainabilityFilters.includes("local-guides")}
                  onClick={() => handleAddFilter("local-guides")}
                />
                <SustainabilityFilter
                  label="Wildlife Protection"
                  active={sustainabilityFilters.includes("wildlife-protection")}
                  onClick={() => handleAddFilter("wildlife-protection")}
                />
                <SustainabilityFilter
                  label="Cultural Preservation"
                  active={sustainabilityFilters.includes("cultural-preservation")}
                  onClick={() => handleAddFilter("cultural-preservation")}
                />
                <SustainabilityFilter
                  label="Plastic-Free"
                  active={sustainabilityFilters.includes("plastic-free")}
                  onClick={() => handleAddFilter("plastic-free")}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="restaurants" className="mt-0">
            <div className="bg-yovu-mint/20 p-4 rounded-md mb-4">
              <h3 className="text-sm font-medium text-yovu-charcoal mb-2">Restaurant Filters</h3>
              <div className="flex flex-wrap gap-2">
                <SustainabilityFilter
                  label="Locally Sourced"
                  active={sustainabilityFilters.includes("locally-sourced")}
                  onClick={() => handleAddFilter("locally-sourced")}
                />
                <SustainabilityFilter
                  label="Organic"
                  active={sustainabilityFilters.includes("organic")}
                  onClick={() => handleAddFilter("organic")}
                />
                <SustainabilityFilter
                  label="Zero Waste"
                  active={sustainabilityFilters.includes("zero-waste")}
                  onClick={() => handleAddFilter("zero-waste")}
                />
                <SustainabilityFilter
                  label="Plant-Based Options"
                  active={sustainabilityFilters.includes("plant-based")}
                  onClick={() => handleAddFilter("plant-based")}
                />
                <SustainabilityFilter
                  label="Seasonal Menu"
                  active={sustainabilityFilters.includes("seasonal")}
                  onClick={() => handleAddFilter("seasonal")}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="transportation" className="mt-0">
            <div className="bg-yovu-mint/20 p-4 rounded-md mb-4">
              <h3 className="text-sm font-medium text-yovu-charcoal mb-2">Transportation Filters</h3>
              <div className="flex flex-wrap gap-2">
                <SustainabilityFilter
                  label="Electric Vehicles"
                  active={sustainabilityFilters.includes("electric-vehicles")}
                  onClick={() => handleAddFilter("electric-vehicles")}
                />
                <SustainabilityFilter
                  label="Carbon Offset"
                  active={sustainabilityFilters.includes("carbon-offset")}
                  onClick={() => handleAddFilter("carbon-offset")}
                />
                <SustainabilityFilter
                  label="Bike Rentals"
                  active={sustainabilityFilters.includes("bike-rentals")}
                  onClick={() => handleAddFilter("bike-rentals")}
                />
                <SustainabilityFilter
                  label="Public Transit"
                  active={sustainabilityFilters.includes("public-transit")}
                  onClick={() => handleAddFilter("public-transit")}
                />
                <SustainabilityFilter
                  label="Shared Rides"
                  active={sustainabilityFilters.includes("shared-rides")}
                  onClick={() => handleAddFilter("shared-rides")}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="flights" className="mt-0">
            <div className="bg-yovu-mint/20 p-4 rounded-md mb-4">
              <h3 className="text-sm font-medium text-yovu-charcoal mb-2">Flight Filters</h3>
              <div className="flex flex-wrap gap-2">
                <SustainabilityFilter
                  label="Carbon Offset"
                  active={sustainabilityFilters.includes("carbon-offset")}
                  onClick={() => handleAddFilter("carbon-offset")}
                />
                <SustainabilityFilter
                  label="Direct Flights"
                  active={sustainabilityFilters.includes("direct-flights")}
                  onClick={() => handleAddFilter("direct-flights")}
                />
                <SustainabilityFilter
                  label="Eco-Friendly Airlines"
                  active={sustainabilityFilters.includes("eco-friendly-airlines")}
                  onClick={() => handleAddFilter("eco-friendly-airlines")}
                />
                <SustainabilityFilter
                  label="Sustainable Aviation Fuel"
                  active={sustainabilityFilters.includes("sustainable-fuel")}
                  onClick={() => handleAddFilter("sustainable-fuel")}
                />
                <SustainabilityFilter
                  label="Economy Class"
                  active={sustainabilityFilters.includes("economy-class")}
                  onClick={() => handleAddFilter("economy-class")}
                />
              </div>
            </div>
          </TabsContent>

          <div className="flex justify-center">
            <Button type="submit" className="bg-yovu-charcoal text-white px-8 py-2 text-base">
              Search Sustainable Options
            </Button>
          </div>
        </form>
      </Tabs>
    </div>
  )
}

interface SustainabilityFilterProps {
  label: string
  active: boolean
  onClick: () => void
}

function SustainabilityFilter({ label, active, onClick }: SustainabilityFilterProps) {
  return (
    <Badge
      variant={active ? "default" : "outline"}
      className={cn(
        "cursor-pointer hover:bg-yovu-mint/40 transition-colors",
        active ? "bg-yovu-charcoal text-white" : "bg-white text-yovu-charcoal border-yovu-charcoal/30",
      )}
      onClick={onClick}
    >
      {label}
    </Badge>
  )
}
