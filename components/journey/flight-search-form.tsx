"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon, Plus, Minus, Plane, X } from "lucide-react"
import { cn } from "@/lib/utils"

// Common airport codes and cities for autocomplete
const POPULAR_AIRPORTS = [
  { code: "JFK", city: "New York", country: "United States" },
  { code: "LAX", city: "Los Angeles", country: "United States" },
  { code: "LHR", city: "London", country: "United Kingdom" },
  { code: "CDG", city: "Paris", country: "France" },
  { code: "FRA", city: "Frankfurt", country: "Germany" },
  { code: "AMS", city: "Amsterdam", country: "Netherlands" },
  { code: "MAD", city: "Madrid", country: "Spain" },
  { code: "FCO", city: "Rome", country: "Italy" },
  { code: "SIN", city: "Singapore", country: "Singapore" },
  { code: "HND", city: "Tokyo", country: "Japan" },
  { code: "SYD", city: "Sydney", country: "Australia" },
  { code: "DXB", city: "Dubai", country: "United Arab Emirates" },
  { code: "LJU", city: "Ljubljana", country: "Slovenia" },
  { code: "ZAG", city: "Zagreb", country: "Croatia" },
  { code: "VIE", city: "Vienna", country: "Austria" },
  { code: "LIS", city: "Lisbon", country: "Portugal" },
  { code: "OPO", city: "Porto", country: "Portugal" },
  { code: "SJO", city: "San José", country: "Costa Rica" },
  { code: "LIR", city: "Liberia", country: "Costa Rica" },
  { code: "AKL", city: "Auckland", country: "New Zealand" },
  { code: "CHC", city: "Christchurch", country: "New Zealand" },
  { code: "OSL", city: "Oslo", country: "Norway" },
  { code: "BGO", city: "Bergen", country: "Norway" },
  { code: "PBH", city: "Paro", country: "Bhutan" },
]

// Airlines for airline preference
const AIRLINES = [
  { code: "GA", name: "Green Airways", sustainable: true },
  { code: "EA", name: "Eco Atlantic", sustainable: true },
  { code: "AA", name: "Alpine Air", sustainable: true },
  { code: "BA", name: "British Airways", sustainable: false },
  { code: "LH", name: "Lufthansa", sustainable: false },
  { code: "AF", name: "Air France", sustainable: false },
  { code: "DL", name: "Delta Air Lines", sustainable: false },
  { code: "UA", name: "United Airlines", sustainable: false },
  { code: "EK", name: "Emirates", sustainable: false },
  { code: "SQ", name: "Singapore Airlines", sustainable: false },
]

// Flight search form interface
interface FlightSearchFormProps {
  onSearch?: (searchParams: FlightSearchParams) => void
  initialValues?: Partial<FlightSearchParams>
}

// Flight search parameters interface
export interface FlightSearchParams {
  tripType: "one-way" | "round-trip" | "multi-city"
  origin: string
  destination: string
  departureDate: Date | undefined
  returnDate: Date | undefined
  passengers: {
    adults: number
    children: number
    infants: number
  }
  cabinClass: "economy" | "premium-economy" | "business" | "first"
  directFlightsOnly: boolean
  flexibleDates: boolean
  preferredAirlines: string[]
  baggageIncluded: boolean
  sustainableOnly: boolean
  multiCitySegments?: {
    origin: string
    destination: string
    date: Date | undefined
  }[]
}

export function FlightSearchForm({ onSearch, initialValues }: FlightSearchFormProps) {
  const router = useRouter()

  // Initialize search parameters with defaults or initial values
  const [searchParams, setSearchParams] = useState<FlightSearchParams>({
    tripType: initialValues?.tripType || "round-trip",
    origin: initialValues?.origin || "",
    destination: initialValues?.destination || "",
    departureDate: initialValues?.departureDate,
    returnDate: initialValues?.returnDate,
    passengers: initialValues?.passengers || {
      adults: 1,
      children: 0,
      infants: 0,
    },
    cabinClass: initialValues?.cabinClass || "economy",
    directFlightsOnly: initialValues?.directFlightsOnly || false,
    flexibleDates: initialValues?.flexibleDates || false,
    preferredAirlines: initialValues?.preferredAirlines || [],
    baggageIncluded: initialValues?.baggageIncluded || true,
    sustainableOnly: initialValues?.sustainableOnly || true,
    multiCitySegments: initialValues?.multiCitySegments || [
      { origin: "", destination: "", date: undefined },
      { origin: "", destination: "", date: undefined },
    ],
  })

  // State for airport search
  const [originSearch, setOriginSearch] = useState("")
  const [destinationSearch, setDestinationSearch] = useState(
    initialValues?.destination
      ? POPULAR_AIRPORTS.find((a) => a.code === initialValues.destination || a.city === initialValues.destination)
          ?.city +
          ` (${POPULAR_AIRPORTS.find((a) => a.code === initialValues.destination || a.city === initialValues.destination)?.code})`
      : "",
  )

  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false)
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false)

  // Filter airports based on search
  const filteredOriginAirports = POPULAR_AIRPORTS.filter(
    (airport) =>
      airport.code.toLowerCase().includes(originSearch.toLowerCase()) ||
      airport.city.toLowerCase().includes(originSearch.toLowerCase()) ||
      airport.country.toLowerCase().includes(originSearch.toLowerCase()),
  ).slice(0, 5)

  const filteredDestinationAirports = POPULAR_AIRPORTS.filter(
    (airport) =>
      airport.code.toLowerCase().includes(destinationSearch.toLowerCase()) ||
      airport.city.toLowerCase().includes(destinationSearch.toLowerCase()) ||
      airport.country.toLowerCase().includes(destinationSearch.toLowerCase()),
  ).slice(0, 5)

  // Update passenger count
  const updatePassengers = (type: "adults" | "children" | "infants", value: number) => {
    // Ensure we have at least 1 adult
    if (type === "adults" && value < 1) return

    // Ensure we don't have negative values
    if (value < 0) return

    // Ensure we don't have more infants than adults
    if (type === "infants" && value > searchParams.passengers.adults) return

    // Limit total travelers to 9 (common airline limit)
    const totalPassengers =
      (type === "adults" ? value : searchParams.passengers.adults) +
      (type === "children" ? value : searchParams.passengers.children) +
      (type === "infants" ? value : searchParams.passengers.infants)

    if (totalPassengers > 9) return

    setSearchParams({
      ...searchParams,
      passengers: {
        ...searchParams.passengers,
        [type]: value,
      },
    })
  }

  // Toggle preferred airline
  const togglePreferredAirline = (airlineCode: string) => {
    if (searchParams.preferredAirlines.includes(airlineCode)) {
      setSearchParams({
        ...searchParams,
        preferredAirlines: searchParams.preferredAirlines.filter((code) => code !== airlineCode),
      })
    } else {
      setSearchParams({
        ...searchParams,
        preferredAirlines: [...searchParams.preferredAirlines, airlineCode],
      })
    }
  }

  // Update multi-city segment
  const updateMultiCitySegment = (
    index: number,
    field: "origin" | "destination" | "date",
    value: string | Date | undefined,
  ) => {
    const updatedSegments = [...searchParams.multiCitySegments!]
    if (field === "origin" || field === "destination") {
      updatedSegments[index] = {
        ...updatedSegments[index],
        [field]: value as string,
      }
    } else {
      updatedSegments[index] = {
        ...updatedSegments[index],
        date: value as Date | undefined,
      }
    }

    setSearchParams({
      ...searchParams,
      multiCitySegments: updatedSegments,
    })
  }

  // Add new multi-city segment
  const addMultiCitySegment = () => {
    if (searchParams.multiCitySegments && searchParams.multiCitySegments.length < 5) {
      setSearchParams({
        ...searchParams,
        multiCitySegments: [...searchParams.multiCitySegments, { origin: "", destination: "", date: undefined }],
      })
    }
  }

  // Remove multi-city segment
  const removeMultiCitySegment = (index: number) => {
    if (searchParams.multiCitySegments && searchParams.multiCitySegments.length > 2) {
      const updatedSegments = [...searchParams.multiCitySegments]
      updatedSegments.splice(index, 1)
      setSearchParams({
        ...searchParams,
        multiCitySegments: updatedSegments,
      })
    }
  }

  // Handle search submission
  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchParams)
    } else {
      // Build query parameters for URL
      const params = new URLSearchParams()

      params.append("tripType", searchParams.tripType)
      params.append("origin", searchParams.origin)
      params.append("destination", searchParams.destination)

      if (searchParams.departureDate) {
        params.append("departureDate", searchParams.departureDate.toISOString())
      }

      if (searchParams.returnDate && searchParams.tripType === "round-trip") {
        params.append("returnDate", searchParams.returnDate.toISOString())
      }

      params.append("adults", searchParams.passengers.adults.toString())
      params.append("children", searchParams.passengers.children.toString())
      params.append("infants", searchParams.passengers.infants.toString())
      params.append("cabinClass", searchParams.cabinClass)
      params.append("directFlightsOnly", searchParams.directFlightsOnly.toString())
      params.append("flexibleDates", searchParams.flexibleDates.toString())
      params.append("baggageIncluded", searchParams.baggageIncluded.toString())
      params.append("sustainableOnly", searchParams.sustainableOnly.toString())

      searchParams.preferredAirlines.forEach((airline) => {
        params.append("airline", airline)
      })

      if (searchParams.tripType === "multi-city" && searchParams.multiCitySegments) {
        searchParams.multiCitySegments.forEach((segment, index) => {
          params.append(`segment${index}Origin`, segment.origin)
          params.append(`segment${index}Destination`, segment.destination)
          if (segment.date) {
            params.append(`segment${index}Date`, segment.date.toISOString())
          }
        })
      }

      router.push(`/flight-results?${params.toString()}`)
    }
  }

  // Check if search can be performed
  const canSearch = () => {
    if (searchParams.tripType === "one-way" || searchParams.tripType === "round-trip") {
      return (
        searchParams.origin &&
        searchParams.destination &&
        searchParams.departureDate &&
        (searchParams.tripType === "one-way" || searchParams.returnDate)
      )
    } else if (searchParams.tripType === "multi-city" && searchParams.multiCitySegments) {
      return searchParams.multiCitySegments.every((segment) => segment.origin && segment.destination && segment.date)
    }
    return false
  }

  return (
    <Card className="border-yovu-mint">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Trip Type Selection */}
          <div className="space-y-3">
            <Label className="text-yovu-charcoal">Trip Type</Label>
            <RadioGroup
              value={searchParams.tripType}
              onValueChange={(value: "one-way" | "round-trip" | "multi-city") =>
                setSearchParams({ ...searchParams, tripType: value })
              }
              className="flex flex-wrap gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="round-trip" id="round-trip" />
                <Label htmlFor="round-trip" className="cursor-pointer">
                  Round Trip
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="one-way" id="one-way" />
                <Label htmlFor="one-way" className="cursor-pointer">
                  One Way
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="multi-city" id="multi-city" />
                <Label htmlFor="multi-city" className="cursor-pointer">
                  Multi-City
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Origin and Destination for One-way and Round-trip */}
          {(searchParams.tripType === "one-way" || searchParams.tripType === "round-trip") && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Origin */}
              <div className="space-y-2 relative">
                <Label htmlFor="origin" className="text-yovu-charcoal">
                  Origin
                </Label>
                <Input
                  id="origin"
                  placeholder="City or airport code"
                  value={originSearch}
                  onChange={(e) => {
                    setOriginSearch(e.target.value)
                    setShowOriginSuggestions(true)
                  }}
                  onFocus={() => setShowOriginSuggestions(true)}
                  className="border-yovu-mint"
                />
                {showOriginSuggestions && originSearch && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-yovu-mint rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredOriginAirports.length > 0 ? (
                      filteredOriginAirports.map((airport) => (
                        <div
                          key={airport.code}
                          className="p-2 hover:bg-yovu-mint/20 cursor-pointer"
                          onClick={() => {
                            setSearchParams({ ...searchParams, origin: airport.code })
                            setOriginSearch(`${airport.city} (${airport.code})`)
                            setShowOriginSuggestions(false)
                          }}
                        >
                          <div className="font-medium">
                            {airport.city} ({airport.code})
                          </div>
                          <div className="text-sm text-gray-500">{airport.country}</div>
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-gray-500">No airports found</div>
                    )}
                  </div>
                )}
              </div>

              {/* Destination */}
              <div className="space-y-2 relative">
                <Label htmlFor="destination" className="text-yovu-charcoal">
                  Destination
                </Label>
                <Input
                  id="destination"
                  placeholder="City or airport code"
                  value={destinationSearch}
                  onChange={(e) => {
                    setDestinationSearch(e.target.value)
                    setShowDestinationSuggestions(true)
                  }}
                  onFocus={() => setShowDestinationSuggestions(true)}
                  className={`border-yovu-mint ${initialValues?.destination ? "bg-gray-100" : ""}`}
                  disabled={!!initialValues?.destination}
                />
                {showDestinationSuggestions && destinationSearch && !initialValues?.destination && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-yovu-mint rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredDestinationAirports.length > 0 ? (
                      filteredDestinationAirports.map((airport) => (
                        <div
                          key={airport.code}
                          className="p-2 hover:bg-yovu-mint/20 cursor-pointer"
                          onClick={() => {
                            setSearchParams({ ...searchParams, destination: airport.code })
                            setDestinationSearch(`${airport.city} (${airport.code})`)
                            setShowDestinationSuggestions(false)
                          }}
                        >
                          <div className="font-medium">
                            {airport.city} ({airport.code})
                          </div>
                          <div className="text-sm text-gray-500">{airport.country}</div>
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-gray-500">No airports found</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Multi-city segments */}
          {searchParams.tripType === "multi-city" && searchParams.multiCitySegments && (
            <div className="space-y-4">
              {searchParams.multiCitySegments.map((segment, index) => (
                <div key={index} className="p-4 border border-yovu-mint rounded-md">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-yovu-charcoal">Flight {index + 1}</h3>
                    {index >= 2 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMultiCitySegment(index)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="space-y-2">
                      <Label className="text-yovu-charcoal">Origin</Label>
                      <Input
                        placeholder="City or airport code"
                        value={segment.origin}
                        onChange={(e) => updateMultiCitySegment(index, "origin", e.target.value)}
                        className="border-yovu-mint"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-yovu-charcoal">Destination</Label>
                      <Input
                        placeholder="City or airport code"
                        value={segment.destination}
                        onChange={(e) => updateMultiCitySegment(index, "destination", e.target.value)}
                        className="border-yovu-mint"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-yovu-charcoal">Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal border-yovu-mint",
                              !segment.date && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {segment.date ? format(segment.date, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={segment.date}
                            onSelect={(date) => updateMultiCitySegment(index, "date", date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
              ))}

              {searchParams.multiCitySegments.length < 5 && (
                <Button
                  variant="outline"
                  onClick={addMultiCitySegment}
                  className="w-full border-yovu-mint text-yovu-charcoal"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add another flight
                </Button>
              )}
            </div>
          )}

          {/* Dates for One-way and Round-trip */}
          {(searchParams.tripType === "one-way" || searchParams.tripType === "round-trip") && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Departure Date */}
              <div className="space-y-2">
                <Label className="text-yovu-charcoal">Departure Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal border-yovu-mint",
                        !searchParams.departureDate && "text-muted-foreground",
                        initialValues?.departureDate && "bg-gray-100",
                      )}
                      disabled={!!initialValues?.departureDate}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {searchParams.departureDate ? format(searchParams.departureDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={searchParams.departureDate}
                      onSelect={(date) => setSearchParams({ ...searchParams, departureDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Return Date (only for round-trip) */}
              {searchParams.tripType === "round-trip" && (
                <div className="space-y-2">
                  <Label className="text-yovu-charcoal">Return Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal border-yovu-mint",
                          !searchParams.returnDate && "text-muted-foreground",
                          initialValues?.returnDate && "bg-gray-100",
                        )}
                        disabled={!!initialValues?.returnDate}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {searchParams.returnDate ? format(searchParams.returnDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={searchParams.returnDate}
                        onSelect={(date) => setSearchParams({ ...searchParams, returnDate: date })}
                        initialFocus
                        disabled={(date) => (searchParams.departureDate ? date < searchParams.departureDate : false)}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>
          )}

          {/* Passengers and Cabin Class */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Passengers */}
            <div className="space-y-3">
              <Label className="text-yovu-charcoal">Passengers</Label>
              <div className="space-y-3">
                {/* Adults */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Adults</div>
                    <div className="text-sm text-gray-500">Age 12+</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full border-yovu-charcoal"
                      onClick={() => updatePassengers("adults", searchParams.passengers.adults - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-5 text-center font-medium">{searchParams.passengers.adults}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full border-yovu-charcoal"
                      onClick={() => updatePassengers("adults", searchParams.passengers.adults + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Children</div>
                    <div className="text-sm text-gray-500">Age 2-11</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full border-yovu-charcoal"
                      onClick={() => updatePassengers("children", searchParams.passengers.children - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-5 text-center font-medium">{searchParams.passengers.children}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full border-yovu-charcoal"
                      onClick={() => updatePassengers("children", searchParams.passengers.children + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Infants */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Infants</div>
                    <div className="text-sm text-gray-500">Under 2</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full border-yovu-charcoal"
                      onClick={() => updatePassengers("infants", searchParams.passengers.infants - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-5 text-center font-medium">{searchParams.passengers.infants}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full border-yovu-charcoal"
                      onClick={() => updatePassengers("infants", searchParams.passengers.infants + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Cabin Class */}
            <div className="space-y-3">
              <Label className="text-yovu-charcoal">Cabin Class</Label>
              <Select
                value={searchParams.cabinClass}
                onValueChange={(value: "economy" | "premium-economy" | "business" | "first") =>
                  setSearchParams({ ...searchParams, cabinClass: value })
                }
              >
                <SelectTrigger className="border-yovu-mint">
                  <SelectValue placeholder="Select cabin class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="economy">Economy</SelectItem>
                  <SelectItem value="premium-economy">Premium Economy</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="first">First Class</SelectItem>
                </SelectContent>
              </Select>

              {/* Additional Options */}
              <div className="space-y-3 mt-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="direct-flights" className="cursor-pointer">
                    Direct flights only
                  </Label>
                  <Switch
                    id="direct-flights"
                    checked={searchParams.directFlightsOnly}
                    onCheckedChange={(checked) => setSearchParams({ ...searchParams, directFlightsOnly: checked })}
                    className="data-[state=checked]:bg-yovu-charcoal"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="flexible-dates" className="cursor-pointer">
                    Flexible dates (±3 days)
                  </Label>
                  <Switch
                    id="flexible-dates"
                    checked={searchParams.flexibleDates}
                    onCheckedChange={(checked) => setSearchParams({ ...searchParams, flexibleDates: checked })}
                    className="data-[state=checked]:bg-yovu-charcoal"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="baggage-included" className="cursor-pointer">
                    Include checked baggage
                  </Label>
                  <Switch
                    id="baggage-included"
                    checked={searchParams.baggageIncluded}
                    onCheckedChange={(checked) => setSearchParams({ ...searchParams, baggageIncluded: checked })}
                    className="data-[state=checked]:bg-yovu-charcoal"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="sustainable-only" className="cursor-pointer">
                    Sustainable airlines only
                  </Label>
                  <Switch
                    id="sustainable-only"
                    checked={searchParams.sustainableOnly}
                    onCheckedChange={(checked) => setSearchParams({ ...searchParams, sustainableOnly: checked })}
                    className="data-[state=checked]:bg-yovu-charcoal"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preferred Airlines */}
          <div className="space-y-3">
            <Label className="text-yovu-charcoal">Preferred Airlines (Optional)</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
              {AIRLINES.map((airline) => (
                <div
                  key={airline.code}
                  onClick={() => togglePreferredAirline(airline.code)}
                  className={`
                    p-2 rounded-md border cursor-pointer transition-all text-center
                    ${
                      searchParams.preferredAirlines.includes(airline.code)
                        ? "border-yovu-charcoal bg-yovu-mint/20"
                        : "border-gray-200 hover:border-yovu-mint"
                    }
                    ${airline.sustainable ? "relative" : ""}
                  `}
                >
                  <div className="text-sm font-medium">{airline.name}</div>
                  {airline.sustainable && (
                    <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-1 rounded-bl-md">Eco</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            disabled={!canSearch()}
            className="w-full bg-yovu-charcoal text-white hover:bg-yovu-charcoal/90"
          >
            <Plane className="mr-2 h-4 w-4" /> Search Flights
          </Button>

          {/* API Integration Note */}
          <div className="text-sm text-gray-500 text-center">
            <p>
              Flight search powered by airline APIs and our sustainable travel partners.
              <br />
              Results include carbon offset data and sustainability ratings.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
