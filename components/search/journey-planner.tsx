"use client"

import { useJourney } from "@/lib/journey-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function JourneyPlanner() {
  const { items, removeItem, clearItems, totalPrice, averageSustainabilityScore, totalCarbonFootprint } = useJourney()
  const [isExpanded, setIsExpanded] = useState(false)
  const router = useRouter()

  // Ensure items is always an array
  const journeyItems = Array.isArray(items) ? items : []
  const hasItems = journeyItems.length > 0

  const handleCheckout = () => {
    router.push("/checkout")
  }

  return (
    <Card className="sticky top-24">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-yovu-charcoal">Your Journey</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!hasItems ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-2">Your journey is empty</p>
            <p className="text-sm text-muted-foreground">
              Add accommodations, activities, restaurants, and transportation to build your sustainable travel
              experience.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {isExpanded ? (
                journeyItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.type}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">${item.price}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name} from journey`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center">
                  <p className="text-sm">
                    {journeyItems.length} {journeyItems.length === 1 ? "item" : "items"} in your journey
                  </p>
                </div>
              )}
              <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? "Show less" : "Show all items"}
              </Button>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-sm">
                <span>Sustainability Score</span>
                <span className="font-medium">{averageSustainabilityScore.toFixed(1)}/10</span>
              </div>
              <Progress value={averageSustainabilityScore * 10} className="h-2" />

              <div className="flex justify-between text-sm mt-4">
                <span>Carbon Footprint</span>
                <span className="font-medium">{totalCarbonFootprint.toFixed(1)} kg CO₂</span>
              </div>

              <div className="flex justify-between text-sm font-medium mt-4 pt-2 border-t">
                <span>Total Price</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
          className="w-full bg-yovu-charcoal hover:bg-yovu-charcoal/90"
          disabled={!hasItems}
          onClick={handleCheckout}
        >
          Checkout
        </Button>
        {hasItems && (
          <Button variant="outline" size="sm" className="w-full text-xs" onClick={clearItems}>
            Clear Journey
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
