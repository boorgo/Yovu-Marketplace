"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Bed, Utensils, Bike, Car, Plane, Leaf } from "lucide-react"

interface DestinationFiltersProps {
  filters: {
    serviceTypes: string[]
    sustainabilityFeatures: string[]
    priceRange: [number, number]
    sortBy: "sustainability" | "price-low" | "price-high" | "rating"
  }
  onChange: (filters: {
    serviceTypes: string[]
    sustainabilityFeatures: string[]
    priceRange: [number, number]
    sortBy: "sustainability" | "price-low" | "price-high" | "rating"
  }) => void
}

export function DestinationFilters({ filters, onChange }: DestinationFiltersProps) {
  const [localFilters, setLocalFilters] = useState(filters)

  const handleServiceTypeChange = (type: string) => {
    const updatedTypes = localFilters.serviceTypes.includes(type)
      ? localFilters.serviceTypes.filter((t) => t !== type)
      : [...localFilters.serviceTypes, type]

    const newFilters = { ...localFilters, serviceTypes: updatedTypes }
    setLocalFilters(newFilters)
    onChange(newFilters)
  }

  const handleSustainabilityFeatureChange = (feature: string) => {
    const updatedFeatures = localFilters.sustainabilityFeatures.includes(feature)
      ? localFilters.sustainabilityFeatures.filter((f) => f !== feature)
      : [...localFilters.sustainabilityFeatures, feature]

    const newFilters = { ...localFilters, sustainabilityFeatures: updatedFeatures }
    setLocalFilters(newFilters)
    onChange(newFilters)
  }

  const handlePriceRangeChange = (value: number[]) => {
    const newFilters = { ...localFilters, priceRange: [value[0], value[1]] as [number, number] }
    setLocalFilters(newFilters)
    onChange(newFilters)
  }

  const handleSortChange = (value: "sustainability" | "price-low" | "price-high" | "rating") => {
    const newFilters = { ...localFilters, sortBy: value }
    setLocalFilters(newFilters)
    onChange(newFilters)
  }

  const handleReset = () => {
    const resetFilters = {
      serviceTypes: [],
      sustainabilityFeatures: [],
      priceRange: [0, 1000] as [number, number],
      sortBy: "sustainability" as "sustainability" | "price-low" | "price-high" | "rating",
    }
    setLocalFilters(resetFilters)
    onChange(resetFilters)
  }

  const serviceTypes = [
    { id: "accommodation", label: "Accommodations", icon: <Bed className="h-4 w-4" /> },
    { id: "activity", label: "Activities", icon: <Bike className="h-4 w-4" /> },
    { id: "restaurant", label: "Restaurants", icon: <Utensils className="h-4 w-4" /> },
    { id: "transportation", label: "Transportation", icon: <Car className="h-4 w-4" /> },
    { id: "flight", label: "Flights", icon: <Plane className="h-4 w-4" /> },
  ]

  const sustainabilityFeatures = [
    { id: "carbon-offset", label: "Carbon Offset" },
    { id: "eco-certified", label: "Eco-Certified" },
    { id: "locally-owned", label: "Locally Owned" },
    { id: "organic", label: "Organic" },
    { id: "renewable-energy", label: "Renewable Energy" },
    { id: "plastic-free", label: "Plastic-Free" },
    { id: "community-support", label: "Community Support" },
  ]

  const sortOptions = [
    { id: "sustainability", label: "Sustainability Score" },
    { id: "price-low", label: "Price: Low to High" },
    { id: "price-high", label: "Price: High to Low" },
    { id: "rating", label: "Highest Rated" },
  ]

  return (
    <div className="space-y-6 sticky top-6">
      <Card className="border-yovu-mint">
        <CardHeader className="bg-yovu-mint/30 pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-yovu-charcoal text-lg">Filters</CardTitle>
            <Button
              variant="ghost"
              className="text-sm h-8 px-2 text-yovu-charcoal hover:text-yovu-charcoal/70"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-yovu-charcoal mb-3 flex items-center">
                <Leaf className="h-4 w-4 mr-2" />
                Sort By
              </h3>
              <div className="space-y-2">
                {sortOptions.map((option) => (
                  <div key={option.id} className="flex items-center">
                    <input
                      type="radio"
                      id={`sort-${option.id}`}
                      name="sort"
                      className="mr-2 text-yovu-charcoal"
                      checked={localFilters.sortBy === option.id}
                      onChange={() => handleSortChange(option.id as any)}
                    />
                    <Label htmlFor={`sort-${option.id}`} className="text-sm text-yovu-charcoal cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-yovu-mint/30 pt-4">
              <h3 className="font-medium text-yovu-charcoal mb-3">Service Types</h3>
              <div className="space-y-2">
                {serviceTypes.map((type) => (
                  <div key={type.id} className="flex items-center">
                    <Checkbox
                      id={`type-${type.id}`}
                      checked={localFilters.serviceTypes.includes(type.id)}
                      onCheckedChange={() => handleServiceTypeChange(type.id)}
                      className="border-yovu-charcoal data-[state=checked]:bg-yovu-charcoal data-[state=checked]:text-white"
                    />
                    <Label htmlFor={`type-${type.id}`} className="ml-2 text-sm text-yovu-charcoal flex items-center">
                      {type.icon}
                      <span className="ml-2">{type.label}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-yovu-mint/30 pt-4">
              <h3 className="font-medium text-yovu-charcoal mb-3">Price Range</h3>
              <div className="px-2">
                <Slider
                  defaultValue={[localFilters.priceRange[0], localFilters.priceRange[1]]}
                  max={1000}
                  step={10}
                  onValueChange={handlePriceRangeChange}
                  className="my-6"
                />
                <div className="flex justify-between text-sm text-yovu-charcoal">
                  <span>${localFilters.priceRange[0]}</span>
                  <span>${localFilters.priceRange[1]}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-yovu-mint/30 pt-4">
              <h3 className="font-medium text-yovu-charcoal mb-3">Sustainability Features</h3>
              <div className="space-y-2">
                {sustainabilityFeatures.map((feature) => (
                  <div key={feature.id} className="flex items-center">
                    <Checkbox
                      id={`feature-${feature.id}`}
                      checked={localFilters.sustainabilityFeatures.includes(feature.id)}
                      onCheckedChange={() => handleSustainabilityFeatureChange(feature.id)}
                      className="border-yovu-charcoal data-[state=checked]:bg-yovu-charcoal data-[state=checked]:text-white"
                    />
                    <Label htmlFor={`feature-${feature.id}`} className="ml-2 text-sm text-yovu-charcoal">
                      {feature.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
