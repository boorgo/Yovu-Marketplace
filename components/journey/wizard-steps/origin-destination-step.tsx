"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { format } from "date-fns"
import { CalendarIcon, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

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

interface OriginDestinationStepProps {
  origin: string
  destination: string
  departureDate: Date | undefined
  returnDate: Date | undefined
  tripType: "round-trip" | "one-way"
  onChange: (data: {
    origin?: string
    destination?: string
    departureDate?: Date
    returnDate?: Date | undefined
    tripType?: "round-trip" | "one-way"
  }) => void
}

export function OriginDestinationStep({
  origin,
  destination,
  departureDate,
  returnDate,
  tripType,
  onChange,
}: OriginDestinationStepProps) {
  const [originSuggestions, setOriginSuggestions] = useState<typeof popularOrigins>([])
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false)

  const [destinationSuggestions, setDestinationSuggestions] = useState<typeof popularDestinations>([])
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false)

  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: departureDate,
    to: returnDate,
  })

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

  // Handle date selection
  const handleDateSelect = (range: { from: Date | undefined; to: Date | undefined } | undefined) => {
    if (!range) {
      setDateRange({ from: undefined, to: undefined })
      onChange({ departureDate: undefined, returnDate: undefined })
      return
    }

    setDateRange(range)

    if (tripType === "one-way") {
      onChange({ departureDate: range.from, returnDate: undefined })
    } else {
      onChange({ departureDate: range.from, returnDate: range.to })
    }
  }

  // Handle trip type change
  const handleTripTypeChange = (value: "round-trip" | "one-way") => {
    onChange({ tripType: value })

    if (value === "one-way") {
      onChange({ returnDate: undefined })
    }
  }

  return (
    <div className="space-y-6">
      {/* Trip Type Selection */}
      <div className="space-y-2">
        <Label className="text-yovu-charcoal">Trip type</Label>
        <RadioGroup
          value={tripType}
          onValueChange={(v) => handleTripTypeChange(v as "round-trip" | "one-way")}
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
          <Label htmlFor="origin" className="text-yovu-charcoal">
            Where are you departing from?
          </Label>
          <div className="relative mt-1">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-yovu-charcoal/50" />
            <Input
              id="origin"
              placeholder="City, airport, or country"
              value={origin}
              onChange={(e) => onChange({ origin: e.target.value })}
              onFocus={() => origin.length > 1 && setShowOriginSuggestions(true)}
              onBlur={() => setTimeout(() => setShowOriginSuggestions(false), 200)}
              className="pl-10 border-yovu-mint"
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
                    onChange({ origin: `${item.name}, ${item.country} (${item.code})` })
                    setShowOriginSuggestions(false)
                  }}
                >
                  <MapPin className="h-4 w-4 mr-2 text-yovu-charcoal/70" />
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
          <Label htmlFor="destination" className="text-yovu-charcoal">
            Where are you going?
          </Label>
          <div className="relative mt-1">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-yovu-charcoal/50" />
            <Input
              id="destination"
              placeholder="City, airport, or country"
              value={destination}
              onChange={(e) => onChange({ destination: e.target.value })}
              onFocus={() => destination.length > 1 && setShowDestinationSuggestions(true)}
              onBlur={() => setTimeout(() => setShowDestinationSuggestions(false), 200)}
              className="pl-10 border-yovu-mint"
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
                    onChange({ destination: `${item.name}, ${item.country} (${item.code})` })
                    setShowDestinationSuggestions(false)
                  }}
                >
                  <MapPin className="h-4 w-4 mr-2 text-yovu-charcoal/70" />
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

      {/* Date Selection */}
      <div className="space-y-2">
        <Label className="text-yovu-charcoal">
          {tripType === "round-trip" ? "Select departure and return dates" : "Select departure date"}
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
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
              onSelect={(selected) => {
                if (tripType === "round-trip") {
                  handleDateSelect(
                    (selected as { from: Date | undefined; to: Date | undefined }) || {
                      from: undefined,
                      to: undefined,
                    },
                  )
                } else {
                  handleDateSelect({ from: selected as Date, to: undefined })
                }
              }}
              initialFocus
              disabled={{ before: new Date() }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Popular Destinations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div>
          <Label className="block text-sm font-medium text-yovu-charcoal mb-2">Popular origins</Label>
          <div className="flex flex-wrap gap-2">
            {popularOrigins.map((orig) => (
              <button
                key={orig.code}
                type="button"
                onClick={() => onChange({ origin: `${orig.name}, ${orig.country} (${orig.code})` })}
                className="px-3 py-1 rounded-full text-sm bg-yovu-mint/30 text-yovu-charcoal hover:bg-yovu-mint/50"
              >
                {orig.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label className="block text-sm font-medium text-yovu-charcoal mb-2">Popular destinations</Label>
          <div className="flex flex-wrap gap-2">
            {popularDestinations.map((dest) => (
              <button
                key={dest.code}
                type="button"
                onClick={() => onChange({ destination: `${dest.name}, ${dest.country} (${dest.code})` })}
                className="px-3 py-1 rounded-full text-sm bg-yovu-mint/30 text-yovu-charcoal hover:bg-yovu-mint/50"
              >
                {dest.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
