"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { CalendarIcon, Search, Users } from "lucide-react"
import { cn } from "@/lib/utils"

export function DestinationSearchForm() {
  const router = useRouter()
  const [destination, setDestination] = useState("")
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })
  const [travelers, setTravelers] = useState("2")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!destination) return

    const searchParams = new URLSearchParams()

    if (dateRange.from) searchParams.append("from", dateRange.from.toISOString())
    if (dateRange.to) searchParams.append("to", dateRange.to.toISOString())
    searchParams.append("travelers", travelers)

    router.push(`/destination/${destination.toLowerCase().replace(/\s+/g, "-")}?${searchParams.toString()}`)
  }

  // Popular destinations for suggestions
  const popularDestinations = ["Costa Rica", "Norway", "New Zealand", "Slovenia", "Palau", "Bhutan"]

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-yovu-mint max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-3">
            <label htmlFor="destination" className="block text-sm font-medium text-yovu-charcoal mb-1">
              Where would you like to go?
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-yovu-charcoal/50" />
              <Input
                id="destination"
                placeholder="Enter a destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="pl-10 border-yovu-mint"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-yovu-charcoal mb-1">When are you traveling?</label>
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
                  mode="range"
                  selected={dateRange}
                  onSelect={(range) => setDateRange(range || { from: undefined, to: undefined })}
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
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-yovu-charcoal mb-2">Popular destinations</label>
          <div className="flex flex-wrap gap-2">
            {popularDestinations.map((dest) => (
              <button
                key={dest}
                type="button"
                onClick={() => setDestination(dest)}
                className={`px-3 py-1 rounded-full text-sm ${
                  destination === dest
                    ? "bg-yovu-charcoal text-white"
                    : "bg-yovu-mint/30 text-yovu-charcoal hover:bg-yovu-mint/50"
                }`}
              >
                {dest}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  )
}
