"use client"

import { memo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Leaf, DollarSign, SortAsc } from "lucide-react"

interface FiltersState {
  sustainabilityFeatures: string[]
  priceRange: [number, number]
  sortBy: "sustainability" | "price-low" | "price-high" | "rating"
}

interface JourneyFiltersProps {
  filters: FiltersState
  onChange: (filters: FiltersState) => void
}

export const JourneyFilters = memo(function JourneyFilters({ filters, onChange }: JourneyFiltersProps) {
  // Handle sustainability feature toggle
  const toggleSustainabilityFeature = (feature: string) => {
    const newFeatures = filters.sustainabilityFeatures.includes(feature)
      ? filters.sustainabilityFeatures.filter((f) => f !== feature)
      : [...filters.sustainabilityFeatures, feature]

    onChange({
      ...filters,
      sustainabilityFeatures: newFeatures,
    })
  }

  // Handle price range change
  const handlePriceRangeChange = (value: number[]) => {
    onChange({
      ...filters,
      priceRange: [value[0], value[1]] as [number, number],
    })
  }

  // Handle sort change
  const handleSortChange = (value: FiltersState["sortBy"]) => {
    onChange({
      ...filters,
      sortBy: value,
    })
  }

  return (
    <Card className="border-yovu-mint">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Price Range Filter */}
          <div className="space-y-3">
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-yovu-charcoal" />
              <Label className="font-medium">Price Range</Label>
            </div>
            <Slider
              value={[filters.priceRange[0], filters.priceRange[1]]}
              min={0}
              max={10000}
              step={100}
              onValueChange={handlePriceRangeChange}
              className="mt-6"
            />
            <div className="flex justify-between text-sm text-yovu-charcoal/70">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>

          {/* Sustainability Features */}
          <div className="space-y-3">
            <div className="flex items-center">
              <Leaf className="h-4 w-4 mr-2 text-green-500" />
              <Label className="font-medium">Sustainability Features</Label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                "carbon-neutral",
                "eco-certified",
                "locally-owned",
                "plastic-free",
                "renewable-energy",
                "community-impact",
              ].map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <Checkbox
                    id={feature}
                    checked={filters.sustainabilityFeatures.includes(feature)}
                    onCheckedChange={() => toggleSustainabilityFeature(feature)}
                  />
                  <Label htmlFor={feature} className="text-sm cursor-pointer">
                    {feature
                      .split("-")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div className="space-y-3">
            <div className="flex items-center">
              <SortAsc className="h-4 w-4 mr-2 text-yovu-charcoal" />
              <Label className="font-medium">Sort By</Label>
            </div>
            <RadioGroup
              value={filters.sortBy}
              onValueChange={(value) => handleSortChange(value as FiltersState["sortBy"])}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sustainability" id="sustainability" />
                <Label htmlFor="sustainability" className="text-sm cursor-pointer">
                  Sustainability (High to Low)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="price-low" id="price-low" />
                <Label htmlFor="price-low" className="text-sm cursor-pointer">
                  Price (Low to High)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="price-high" id="price-high" />
                <Label htmlFor="price-high" className="text-sm cursor-pointer">
                  Price (High to Low)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rating" id="rating" />
                <Label htmlFor="rating" className="text-sm cursor-pointer">
                  Rating (High to Low)
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </CardContent>
    </Card>
  )
})
