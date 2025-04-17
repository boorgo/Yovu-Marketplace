"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trash2, ShoppingCart, BarChart2 } from "lucide-react"
import { useJourney } from "@/lib/journey-context"

interface JourneySidebarProps {
  destination: string
}

export function JourneySidebar({ destination }: JourneySidebarProps) {
  const { journey, removeFromJourney, getJourneyImpact } = useJourney()
  const [expanded, setExpanded] = useState(false)

  // Calculate journey stats
  const impact = getJourneyImpact()
  const journeyItems = [
    ...(journey.accommodation ? [journey.accommodation] : []),
    ...journey.activities,
    ...(journey.transportation ? [journey.transportation] : []),
    ...journey.restaurants,
    ...(journey.flight ? [journey.flight] : []),
  ]

  // Get service type icon and label
  const getTypeInfo = (type: string) => {
    switch (type) {
      case "accommodation":
        return { label: "Stay" }
      case "activity":
        return { label: "Activity" }
      case "restaurant":
        return { label: "Dining" }
      case "transportation":
        return { label: "Transport" }
      case "flight":
        return { label: "Flight" }
      default:
        return { label: type }
    }
  }

  // Get score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 50) return "text-yellow-600"
    return "text-orange-600"
  }

  return (
    <Card className="border-yovu-mint sticky top-6">
      <CardHeader className="bg-yovu-mint/30">
        <CardTitle className="text-yovu-charcoal">Your Journey</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4">
          <h3 className="font-medium text-yovu-charcoal mb-1">Destination</h3>
          <p className="text-yovu-charcoal/80">{destination}</p>
        </div>

        {journeyItems.length === 0 ? (
          <div className="text-center py-6 text-yovu-charcoal/70">
            <p>Your journey is empty.</p>
            <p className="text-sm mt-2">Add items from the search results to start planning your trip.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              {(expanded ? journeyItems : journeyItems.slice(0, 3)).map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex justify-between items-center p-3 border border-yovu-mint/50 rounded-md"
                >
                  <div className="flex-1">
                    <div className="flex items-center">
                      <Badge className="mr-2 bg-yovu-mint/30 text-yovu-charcoal text-xs">
                        {getTypeInfo(item.type).label}
                      </Badge>
                      <h4 className="font-medium text-yovu-charcoal text-sm truncate">{item.title}</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <span className="text-yovu-charcoal font-medium">${item.price}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromJourney(item.type, item.id)}
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {journeyItems.length > 3 && !expanded && (
                <Button
                  variant="outline"
                  className="text-yovu-charcoal border-dashed border-yovu-mint/70 w-full text-sm"
                  onClick={() => setExpanded(true)}
                >
                  Show {journeyItems.length - 3} more items
                </Button>
              )}

              {expanded && journeyItems.length > 3 && (
                <Button
                  variant="outline"
                  className="text-yovu-charcoal border-dashed border-yovu-mint/70 w-full text-sm"
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
                <span className={`font-bold text-xl ${getScoreColor(impact.sustainabilityScore)}`}>
                  {impact.sustainabilityScore}/100
                </span>
              </div>

              <Progress value={impact.sustainabilityScore} className="h-2 mb-4" />

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-sm text-yovu-charcoal/70">Carbon Saved</div>
                  <div className="font-bold text-yovu-charcoal">{impact.carbonSaved}kg</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-yovu-charcoal/70">Items</div>
                  <div className="font-bold text-yovu-charcoal">{journeyItems.length}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-yovu-charcoal/70">Community</div>
                  <div className="font-bold text-yovu-charcoal">${impact.communityImpact || 0}</div>
                </div>
              </div>

              <div className="flex justify-between items-center font-bold text-yovu-charcoal">
                <span>Total Price</span>
                <span>${impact.totalCost}</span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6">
          <Button className="w-full bg-yovu-charcoal text-white" disabled={journeyItems.length === 0}>
            <ShoppingCart className="mr-2 h-4 w-4" /> Book Journey
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
