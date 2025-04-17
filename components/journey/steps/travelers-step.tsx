"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Users, Baby, BabyIcon as Child } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface TravelersStepProps {
  travelers: {
    adults: number
    children: number
    infants: number
  }
  onChange: (travelers: { adults: number; children: number; infants: number }) => void
}

export function TravelersStep({ travelers, onChange }: TravelersStepProps) {
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
    onChange(newTravelers)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <TravelerSelector
          icon={<Users className="h-5 w-5" />}
          label="Adults"
          description="Age 12+"
          value={localTravelers.adults}
          onChange={(value) => updateTravelers("adults", value)}
        />

        <TravelerSelector
          icon={<Child className="h-5 w-5" />}
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

      <div className="p-4 bg-yovu-mint/20 rounded-md">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-yovu-charcoal/70">Total travelers</span>
            <p className="font-medium text-yovu-charcoal">
              {localTravelers.adults + localTravelers.children + localTravelers.infants} travelers
            </p>
          </div>

          <div className="text-right">
            <span className="text-sm text-yovu-charcoal/70">Breakdown</span>
            <p className="font-medium text-yovu-charcoal">
              {localTravelers.adults} {localTravelers.adults === 1 ? "adult" : "adults"}
              {localTravelers.children > 0 &&
                `, ${localTravelers.children} ${localTravelers.children === 1 ? "child" : "children"}`}
              {localTravelers.infants > 0 &&
                `, ${localTravelers.infants} ${localTravelers.infants === 1 ? "infant" : "infants"}`}
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
