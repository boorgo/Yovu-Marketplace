"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { format } from "date-fns"
import { CalendarIcon, Search, Users, MapPin, Plane, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Mock data for destinations and airports
const popularDestinations = [
  { code: "SJO", name: "San José", country: "Costa Rica" },
  { code: "OSL", name: "Oslo", country: "Norway" },
  { code: "AKL", name: "Auckland", country: "New Zealand" },
  { code: "LJU", name: "Ljubljana", country: "Slovenia" },
  { code: "ROR", name: "Koror", country: "Palau" },
  { code: "PBH", name: "Paro", country: "Bhutan" },
]

const popularOrigins = [
  { code: "JFK", name: "New York", country: "USA" },
  { code: "LHR", name: "London", country: "UK" },
  { code: "HND", name: "Tokyo", country: "Japan" },
  { code: "SYD", name: "Sydney", country: "Australia" },
  { code: "TXL", name: "Berlin", country: "Germany" },
  { code: "YYZ", name: "Toronto", country: "Canada" },
]

export function JourneySearchForm() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  // Basic search state
  const [origin, setOrigin] = useState("")
  const [originSuggestions, setOriginSuggestions] = useState<typeof popularOrigins>([])
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false)

  const [destination, setDestination] = useState("")
  const [destinationSuggestions, setDestinationSuggestions] = useState<typeof popularDestinations>([])
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false)

  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })

  // Advanced flight options
  const [tripType, setTripType] = useState<"round-trip" | "one-way">("round-trip")
  const [travelers, setTravelers] = useState("2")
  const [cabinClass, setCabinClass] = useState("economy")
  const [directFlightsOnly, setDirectFlightsOnly] = useState(false)
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)

  // Handle origin input and suggestions
  useEffect(() => {
    if (origin.length > 1) {
      const filtered = popularOrigins.filter(
        (item) =>
          item.name.toLowerCase().includes(origin.toLowerCase()) ||
          item.country.toLowerCase().includes(origin.toLowerCase()) ||
          item.code.toLowerCase().includes(origin.toLowerCase()),
      )
      setOriginSuggestions(filtered)
      setShowOriginSuggestions(true)
    } else {
      setShowOriginSuggestions(false)
    }
  }, [origin])

  // Handle destination input and suggestions
  useEffect(() => {
    if (destination.length > 1) {
      const filtered = popularDestinations.filter(
        (item) =>
          item.name.toLowerCase().includes(destination.toLowerCase()) ||
          item.country.toLowerCase().includes(destination.toLowerCase()) ||
          item.code.toLowerCase().includes(destination.toLowerCase()),
      )
      setDestinationSuggestions(filtered)
      setShowDestinationSuggestions(true)
    } else {
      setShowDestinationSuggestions(false)
    }
  }, [destination])

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!origin || !destination) return

    const searchParams = new URLSearchParams()
    searchParams.append("origin", origin)
    searchParams.append("destination", destination)
    searchParams.append("tripType", tripType)

    if (dateRange.from) searchParams.append("from", dateRange.from.toISOString())
    if (dateRange.to) searchParams.append("to", dateRange.to.toISOString())

    searchParams.append("travelers", travelers)
    searchParams.append("cabinClass", cabinClass)
    searchParams.append("directFlightsOnly", directFlightsOnly.toString())

    router.push(`/design-journey/results?${searchParams.toString()}`)
  }

  // Handle date selection
  const handleDateSelect = (range: { from: Date | undefined; to: Date | undefined } | undefined) => {
    if (!range) {
      setDateRange({ from: undefined, to: undefined })
      return
    }

    if (tripType === "one-way") {
      setDateRange({ from: range.from, to: undefined })
    } else {
      setDateRange(range)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-yovu-mint max-w-4xl mx-auto">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        {/* Trip Type Selection */}
        <div className="flex space-x-4 mb-4">
          <RadioGroup
            value={tripType}
            onValueChange={(value) => setTripType(value as "round-trip" | "one-way")}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="round-trip" id="round-trip" className="border-yovu-charcoal text-yovu-charcoal" />
              <Label htmlFor="round-trip" className="text-yovu-charcoal">
                Round trip
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="one-way" id="one-way" className="border-yovu-charcoal text-yovu-charcoal" />
              <Label htmlFor="one-way" className="text-yovu-charcoal">
                One way
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Origin and Destination */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label htmlFor="origin" className="block text-sm font-medium text-yovu-charcoal mb-1">
              Where are you traveling from?
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-yovu-charcoal/50" />
              <Input
                id="origin"
                placeholder="City, airport, or country"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                onFocus={() => origin.length > 1 && setShowOriginSuggestions(true)}
                onBlur={() => setTimeout(() => setShowOriginSuggestions(false), 200)}
                className="pl-10 border-yovu-mint"
                required
              />
            </div>

            {/* Origin Suggestions */}
            {showOriginSuggestions && originSuggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-yovu-mint rounded-md shadow-lg max-h-60 overflow-auto">
                {originSuggestions.map((item) => (
                  <div
                    key={item.code}
                    className="p-2 hover:bg-yovu-mint/20 cursor-pointer flex items-center"
                    onClick={() => {
                      setOrigin(`${item.name}, ${item.country} (${item.code})`)
                      setShowOriginSuggestions(false)
                    }}
                  >
                    <Plane className="h-4 w-4 mr-2 text-yovu-charcoal/70" />
                    <div>
                      <div className="font-medium">
                        {item.name}, {item.country}
                      </div>
                      <div className="text-xs text-yovu-charcoal/70">{item.code}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <label htmlFor="destination" className="block text-sm font-medium text-yovu-charcoal mb-1">
              Where would you like to go?
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-yovu-charcoal/50" />
              <Input
                id="destination"
                placeholder="City, airport, or country"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onFocus={() => destination.length > 1 && setShowDestinationSuggestions(true)}
                onBlur={() => setTimeout(() => setShowDestinationSuggestions(false), 200)}
                className="pl-10 border-yovu-mint"
                required
              />
            </div>

            {/* Destination Suggestions */}
            {showDestinationSuggestions && destinationSuggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-yovu-mint rounded-md shadow-lg max-h-60 overflow-auto">
                {destinationSuggestions.map((item) => (
                  <div
                    key={item.code}
                    className="p-2 hover:bg-yovu-mint/20 cursor-pointer flex items-center"
                    onClick={() => {
                      setDestination(`${item.name}, ${item.country} (${item.code})`)
                      setShowDestinationSuggestions(false)
                    }}
                  >
                    <Plane className="h-4 w-4 mr-2 text-yovu-charcoal/70" />
                    <div>
                      <div className="font-medium">
                        {item.name}, {item.country}
                      </div>
                      <div className="text-xs text-yovu-charcoal/70">{item.code}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Dates and Travelers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-yovu-charcoal mb-1">When are you traveling?</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button" // Prevent form submission
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal border-yovu-mint",
                    !dateRange.from && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to && tripType === "round-trip" ? (
                      <>
                        {format(dateRange.from, "MMM d, y")} - {format(dateRange.to, "MMM d, y")}
                      </>
                    ) : (
                      format(dateRange.from, "MMM d, y")
                    )
                  ) : (
                    <span>Select dates</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode={tripType === "round-trip" ? "range" : "single"}
                  selected={tripType === "round-trip" ? dateRange : dateRange.from}
                  onSelect={handleDateSelect}
                  initialFocus
                  disabled={{ before: new Date() }}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label className="block text-sm font-medium text-yovu-charcoal mb-1">Number of travelers</label>
            <Select defaultValue="2" onValueChange={setTravelers}>
              <SelectTrigger className="border-yovu-mint">
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Select travelers" />
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
            <label className="block text-sm font-medium text-yovu-charcoal mb-1">&nbsp;</label>
            <Button type="submit" className="w-full bg-yovu-charcoal text-white">
              <Search className="mr-2 h-4 w-4" /> Design Journey
            </Button>
          </div>
        </div>

        {/* Advanced Options Toggle */}
        <div>
          <Button
            type="button"
            variant="link"
            onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
            className="text-yovu-charcoal p-0 h-auto"
          >
            {showAdvancedOptions ? "Hide advanced options" : "Show advanced options"}
            <ArrowRight className={`ml-1 h-4 w-4 transition-transform ${showAdvancedOptions ? "rotate-90" : ""}`} />
          </Button>
        </div>

        {/* Advanced Options */}
        {showAdvancedOptions && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-yovu-mint/10 rounded-md">
            <div>
              <label className="block text-sm font-medium text-yovu-charcoal mb-1">Cabin class</label>
              <Select defaultValue="economy" onValueChange={setCabinClass}>
                <SelectTrigger className="border-yovu-mint bg-white">
                  <SelectValue placeholder="Select cabin class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="economy">Economy</SelectItem>
                  <SelectItem value="premium-economy">Premium Economy</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="first">First Class</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="direct-flights"
                checked={directFlightsOnly}
                onCheckedChange={(checked) => setDirectFlightsOnly(checked === true)}
                className="border-yovu-charcoal data-[state=checked]:bg-yovu-charcoal"
              />
              <label
                htmlFor="direct-flights"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Direct flights only
              </label>
            </div>
          </div>
        )}

        {/* Popular Destinations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-yovu-charcoal mb-2">Popular origins</label>
            <div className="flex flex-wrap gap-2">
              {popularOrigins.map((orig) => (
                <button
                  key={orig.code}
                  type="button"
                  onClick={() => setOrigin(`${orig.name}, ${orig.country} (${orig.code})`)}
                  className="px-3 py-1 rounded-full text-sm bg-yovu-mint/30 text-yovu-charcoal hover:bg-yovu-mint/50"
                >
                  {orig.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-yovu-charcoal mb-2">Popular destinations</label>
            <div className="flex flex-wrap gap-2">
              {popularDestinations.map((dest) => (
                <button
                  key={dest.code}
                  type="button"
                  onClick={() => setDestination(`${dest.name}, ${dest.country} (${dest.code})`)}
                  className="px-3 py-1 rounded-full text-sm bg-yovu-mint/30 text-yovu-charcoal hover:bg-yovu-mint/50"
                >
                  {dest.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
