"use client"

import type React from "react"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Users, Baby, Clock } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface FlightDetailsStepProps {
  travelers: {
    adults: number
    children: number
    infants: number
  }
  cabinClass: string
  directFlightsOnly: boolean
  onChange: (data: {
    travelers?: {
      adults: number
      children: number
      infants: number
    }
    cabinClass?: string
    directFlightsOnly?: boolean
  }) => void
}

export function FlightDetailsStep({ travelers, cabinClass, directFlightsOnly, onChange }: FlightDetailsStepProps) {
  const [localTravelers, setLocalTravelers] = useState(travelers)

  const updateTravelers = (type: "adults" | "children" | "infants", value: number) => {
    // Ensure we have at least 1 adult
    if (type === "adults" && value < 1) return

    // Ensure we don't have negative values
    if (value < 0) return

    // Ensure we don't have more infants than adults
    if (type === "infants" && value > localTravelers.adults) return

    // Limit total travelers to 9 (common airline limit)
    const totalTravelers =
      (type === "adults" ? value : localTravelers.adults) +
      (type === "children" ? value : localTravelers.children) +
      (type === "infants" ? value : localTravelers.infants)

    if (totalTravelers > 9) return

    const newTravelers = {
      ...localTravelers,
      [type]: value,
    }

    setLocalTravelers(newTravelers)
    onChange({ travelers: newTravelers })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="text-yovu-charcoal text-lg">Travelers</Label>
        <TravelerSelector
          icon={<Users className="h-5 w-5" />}
          label="Adults"
          description="Age 12+"
          value={localTravelers.adults}
          onChange={(value) => updateTravelers("adults", value)}
        />

        <TravelerSelector
          icon={<Users className="h-5 w-5" />}
          label="Children"
          description="Age 2-11"
          value={localTravelers.children}
          onChange={(value) => updateTravelers("children", value)}
        />

        <TravelerSelector
          icon={<Baby className="h-5 w-5" />}
          label="Infants"
          description="Under 2"
          value={localTravelers.infants}
          onChange={(value) => updateTravelers("infants", value)}
          tooltip="Infants must sit on an adult's lap. Cannot exceed number of adults."
        />
      </div>

      <div className="pt-4 border-t border-yovu-mint/30">
        <Label className="text-yovu-charcoal text-lg mb-4 block">Flight preferences</Label>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cabin-class" className="text-yovu-charcoal">
              Cabin class
            </Label>
            <Select value={cabinClass} onValueChange={(value) => onChange({ cabinClass: value })}>
              <SelectTrigger id="cabin-class" className="border-yovu-mint">
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

          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yovu-charcoal" />
              <div>
                <Label htmlFor="direct-flights" className="text-yovu-charcoal">
                  Direct flights only
                </Label>
                <p className="text-sm text-yovu-charcoal/70">Avoid layovers and connections</p>
              </div>
            </div>
            <Switch
              id="direct-flights"
              checked={directFlightsOnly}
              onCheckedChange={(checked) => onChange({ directFlightsOnly: checked })}
              className="data-[state=checked]:bg-yovu-charcoal"
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-yovu-mint/20 rounded-md mt-4">
        <div className="flex items-start space-x-2">
          <Users className="h-5 w-5 text-yovu-charcoal mt-0.5" />
          <div>
            <p className="font-medium text-yovu-charcoal">Traveler summary</p>
            <p className="text-sm text-yovu-charcoal/70">
              {localTravelers.adults} {localTravelers.adults === 1 ? "adult" : "adults"}
              {localTravelers.children > 0 &&
                `, ${localTravelers.children} ${localTravelers.children === 1 ? "child" : "children"}`}
              {localTravelers.infants > 0 &&
                `, ${localTravelers.infants} ${localTravelers.infants === 1 ? "infant" : "infants"}`}
            </p>
            <p className="text-sm text-yovu-charcoal/70 mt-1">
              {cabinClass.charAt(0).toUpperCase() + cabinClass.slice(1).replace("-", " ")} class
              {directFlightsOnly ? ", direct flights only" : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

interface TravelerSelectorProps {
  icon: React.ReactNode
  label: string
  description: string
  value: number
  onChange: (value: number) => void
  tooltip?: string
}

function TravelerSelector({ icon, label, description, value, onChange, tooltip }: TravelerSelectorProps) {
  return (
    <div className="flex items-center justify-between p-4 border border-yovu-mint rounded-md">
      <div className="flex items-center">
        <div className="bg-yovu-mint/30 p-2 rounded-full mr-3">{icon}</div>
        <div>
          <div className="flex items-center">
            <span className="font-medium text-yovu-charcoal">{label}</span>
            {tooltip && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="ml-1 text-yovu-charcoal/50 cursor-help text-xs">ⓘ</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">{tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <span className="text-sm text-yovu-charcoal/70">{description}</span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full border-yovu-charcoal"
          onClick={() => onChange(value - 1)}
        >
          <Minus className="h-3 w-3" />
        </Button>

        <span className="w-5 text-center font-medium">{value}</span>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full border-yovu-charcoal"
          onClick={() => onChange(value + 1)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}
