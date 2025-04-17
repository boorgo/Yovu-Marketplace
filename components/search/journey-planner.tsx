"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, ArrowRight, BarChart2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useJourney } from "@/lib/journey-context"

export function JourneyPlanner() {
  const { journey, removeFromJourney, clearJourney } = useJourney()
  const [expanded, setExpanded] = useState(false)

  // Calculate total impact metrics
  const totalCarbon = journey.reduce((total, item) => total + item.carbonSaved, 0)
  const avgNature = journey.length ? journey.reduce((total, item) => total + item.natureImpact, 0) / journey.length : 0
  const totalCommunity = journey.reduce((total, item) => total + item.communityImpact, 0)

  // Calculate total price
  const totalPrice = journey.reduce((total, item) => total + item.price, 0)

  // Calculate sustainability score (0-100)
  const sustainabilityScore = journey.length
    ? Math.min(100, Math.round(totalCarbon / 10 + avgNature + totalCommunity / 5))
    : 0

  // Get score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 50) return "text-yellow-600"
    return "text-orange-600"
  }

  return (
    <Card className="border-yovu-mint sticky top-6">
      <CardHeader className="bg-yovu-mint/50">
        <CardTitle className="text-yovu-charcoal">Your Journey Plan</CardTitle>
        <CardDescription>Design your sustainable travel experience</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        {journey.length === 0 ? (
          <div className="text-center py-8 text-yovu-charcoal/70">
            <p>Your journey is empty.</p>
            <p className="text-sm mt-2">Add items from the search results to start planning your trip.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {(expanded ? journey : journey.slice(0, 3)).map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex justify-between items-center p-3 border border-yovu-mint/50 rounded-md"
                >
                  <div className="flex-1">
                    <div className="flex items-center">
                      <Badge className="mr-2 bg-yovu-charcoal text-white text-xs">{getTypeLabel(item.type)}</Badge>
                      <h4 className="font-medium text-yovu-charcoal truncate">{item.title}</h4>
                    </div>
                    <p className="text-xs text-yovu-charcoal/70">{item.location}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <span className="text-yovu-charcoal font-medium">${item.price}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromJourney(index)}
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {journey.length > 3 && !expanded && (
                <Button
                  variant="outline"
                  className="text-yovu-charcoal border-dashed border-yovu-mint/70"
                  onClick={() => setExpanded(true)}
                >
                  Show {journey.length - 3} more items
                </Button>
              )}

              {expanded && journey.length > 3 && (
                <Button
                  variant="outline"
                  className="text-yovu-charcoal border-dashed border-yovu-mint/70"
                  onClick={() => setExpanded(false)}
                >
                  Show less
                </Button>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-yovu-mint/30">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-yovu-charcoal flex items-center">
                  <BarChart2 className="mr-2 h-4 w-4" />
                  Sustainability Score
                </h3>
                <span className={`font-bold text-xl ${getScoreColor(sustainabilityScore)}`}>
                  {sustainabilityScore}/100
                </span>
              </div>

              <Progress value={sustainabilityScore} className="h-2 mb-4" />

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-sm text-yovu-charcoal/70">Carbon Saved</div>
                  <div className="font-bold text-yovu-charcoal">{totalCarbon}kg</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-yovu-charcoal/70">Nature Impact</div>
                  <div className="font-bold text-yovu-charcoal">{Math.round(avgNature)}%</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-yovu-charcoal/70">Community</div>
                  <div className="font-bold text-yovu-charcoal">${totalCommunity}</div>
                </div>
              </div>

              <div className="flex justify-between items-center font-bold text-yovu-charcoal">
                <span>Total Price</span>
                <span>${totalPrice}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-yovu-mint/20 border-t border-yovu-mint/30 p-4 flex flex-col gap-2">
        <Button className="w-full bg-yovu-charcoal text-white" disabled={journey.length === 0}>
          Book Your Journey <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        {journey.length > 0 && (
          <Button variant="outline" className="w-full text-yovu-charcoal" onClick={clearJourney}>
            Clear Plan
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

function getTypeLabel(type: string): string {
  switch (type) {
    case "accommodations":
      return "Stay"
    case "activities":
      return "Activity"
    case "restaurants":
      return "Dining"
    case "transportation":
      return "Transport"
    case "flights":
      return "Flight"
    default:
      return type
  }
}
