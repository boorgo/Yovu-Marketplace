"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Leaf, Clock, Plane } from "lucide-react"

interface FlightPreferencesStepProps {
  preferences: {
    cabinClass: string
    directFlightsOnly: boolean
    sustainabilityOptions: string[]
  }
  onChange: (preferences: {
    cabinClass: string
    directFlightsOnly: boolean
    sustainabilityOptions: string[]
  }) => void
}

export function FlightPreferencesStep({ preferences, onChange }: FlightPreferencesStepProps) {
  const [localPreferences, setLocalPreferences] = useState(preferences)

  const updatePreferences = (key: keyof typeof localPreferences, value: any) => {
    const newPreferences = { ...localPreferences, [key]: value }
    setLocalPreferences(newPreferences)
    onChange(newPreferences)
  }

  const toggleSustainabilityOption = (option: string) => {
    const currentOptions = [...localPreferences.sustainabilityOptions]
    const index = currentOptions.indexOf(option)

    if (index === -1) {
      currentOptions.push(option)
    } else {
      currentOptions.splice(index, 1)
    }

    updatePreferences("sustainabilityOptions", currentOptions)
  }

  const sustainabilityOptions = [
    { id: "carbon-offset", label: "Carbon Offset", icon: <Leaf className="h-4 w-4" /> },
    { id: "eco-friendly-airlines", label: "Eco-Friendly Airlines", icon: <Plane className="h-4 w-4" /> },
    { id: "sustainable-fuel", label: "Sustainable Aviation Fuel", icon: <Leaf className="h-4 w-4" /> },
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="cabin-class" className="text-yovu-charcoal">
          Cabin class
        </Label>
        <Select value={localPreferences.cabinClass} onValueChange={(value) => updatePreferences("cabinClass", value)}>
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

      <div className="flex items-center justify-between py-4 border-t border-b border-yovu-mint/30">
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
          checked={localPreferences.directFlightsOnly}
          onCheckedChange={(checked) => updatePreferences("directFlightsOnly", checked)}
          className="data-[state=checked]:bg-yovu-charcoal"
        />
      </div>

      <div className="space-y-3">
        <Label className="text-yovu-charcoal">Sustainability options</Label>
        <p className="text-sm text-yovu-charcoal/70">Select options to make your journey more sustainable</p>

        <div className="flex flex-wrap gap-2 mt-2">
          {sustainabilityOptions.map((option) => (
            <Badge
              key={option.id}
              variant={localPreferences.sustainabilityOptions.includes(option.id) ? "default" : "outline"}
              className={`cursor-pointer py-2 px-3 ${
                localPreferences.sustainabilityOptions.includes(option.id)
                  ? "bg-yovu-charcoal text-white"
                  : "bg-white text-yovu-charcoal border-yovu-charcoal/30 hover:bg-yovu-mint/20"
              }`}
              onClick={() => toggleSustainabilityOption(option.id)}
            >
              <span className="flex items-center">
                {option.icon}
                <span className="ml-1">{option.label}</span>
              </span>
            </Badge>
          ))}
        </div>

        <div className="p-4 bg-yovu-mint/20 rounded-md mt-4">
          <div className="flex items-center space-x-2">
            <Leaf className="h-5 w-5 text-yovu-charcoal" />
            <p className="text-sm text-yovu-charcoal">
              <span className="font-medium">Sustainability tip:</span> Choosing direct flights and carbon offset options
              can reduce your journey's environmental impact by up to 50%.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
