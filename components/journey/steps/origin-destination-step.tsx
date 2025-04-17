"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin } from "lucide-react"

interface OriginDestinationStepProps {
  origin: string
  destination: string
  onChange: (origin: string, destination: string) => void
}

export function OriginDestinationStep({ origin, destination, onChange }: OriginDestinationStepProps) {
  const [localOrigin, setLocalOrigin] = useState(origin)
  const [localDestination, setLocalDestination] = useState(destination)

  // Popular destinations for suggestions
  const popularDestinations = [
    "New York, USA",
    "London, UK",
    "Paris, France",
    "Tokyo, Japan",
    "Bali, Indonesia",
    "Costa Rica",
    "Amsterdam, Netherlands",
    "Barcelona, Spain",
  ]

  useEffect(() => {
    onChange(localOrigin, localDestination)
  }, [localOrigin, localDestination, onChange])

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="origin" className="text-yovu-charcoal">
          Where are you departing from?
        </Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-yovu-charcoal/50" />
          <Input
            id="origin"
            placeholder="City or airport"
            value={localOrigin}
            onChange={(e) => setLocalOrigin(e.target.value)}
            className="pl-10 border-yovu-mint"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="destination" className="text-yovu-charcoal">
          Where are you going?
        </Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-yovu-charcoal/50" />
          <Input
            id="destination"
            placeholder="City or airport"
            value={localDestination}
            onChange={(e) => setLocalDestination(e.target.value)}
            className="pl-10 border-yovu-mint"
          />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-yovu-charcoal mb-2">Popular sustainable destinations</h3>
        <div className="flex flex-wrap gap-2">
          {popularDestinations.map((dest) => (
            <button
              key={dest}
              onClick={() => setLocalDestination(dest)}
              className={`px-3 py-1 rounded-full text-sm ${
                localDestination === dest
                  ? "bg-yovu-charcoal text-white"
                  : "bg-yovu-mint/30 text-yovu-charcoal hover:bg-yovu-mint/50"
              }`}
            >
              {dest}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
