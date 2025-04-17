"use client"

import { useState } from "react"
import { useJourneyBuilder } from "@/lib/journey-builder-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Leaf, MapPin, Users, Trash2, Edit, Save, Plus } from "lucide-react"
import { format } from "date-fns"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

export function JourneyBuilderInterface() {
  const { selectedItems, removeItem, updateItem, totalPrice, totalSustainabilityScore } = useJourneyBuilder()
  const [activeTab, setActiveTab] = useState("itinerary")
  const [editingItemId, setEditingItemId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<{
    quantity: number
    notes: string
    startDate?: Date
    endDate?: Date
  }>({
    quantity: 1,
    notes: "",
  })

  // Group items by type for better organization
  const groupedItems = selectedItems.reduce(
    (acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = []
      }
      acc[item.type].push(item)
      return acc
    },
    {} as Record<string, typeof selectedItems>,
  )

  const handleEditItem = (itemId: string) => {
    const item = selectedItems.find((item) => item.id === itemId)
    if (!item) return

    setEditForm({
      quantity: item.quantity || 1,
      notes: item.notes || "",
      startDate: item.startDate,
      endDate: item.endDate,
    })
    setEditingItemId(itemId)
  }

  const handleSaveEdit = () => {
    if (!editingItemId) return

    updateItem(editingItemId, {
      quantity: editForm.quantity,
      notes: editForm.notes,
      startDate: editForm.startDate,
      endDate: editForm.endDate,
    })
    setEditingItemId(null)
  }

  const handleCancelEdit = () => {
    setEditingItemId(null)
  }

  // Get type label
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "flight":
        return "Flights"
      case "accommodation":
        return "Accommodations"
      case "activity":
        return "Activities"
      case "restaurant":
        return "Dining"
      case "transportation":
        return "Transportation"
      default:
        return type.charAt(0).toUpperCase() + type.slice(1) + "s"
    }
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-yovu-charcoal">Your Sustainable Journey</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-yovu-charcoal">Total Price:</span>
            <span className="font-bold text-yovu-charcoal">${totalPrice}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-yovu-charcoal">Sustainability Score:</span>
            <Badge className="bg-yovu-charcoal">
              <Leaf className="h-3 w-3 mr-1" />
              {totalSustainabilityScore}%
            </Badge>
          </div>
          <Button className="bg-yovu-mint text-yovu-charcoal hover:bg-yovu-mint/90">Finalize Journey</Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="bg-yovu-mint">
          <TabsTrigger
            value="itinerary"
            className="data-[state=active]:bg-white data-[state=active]:text-yovu-charcoal"
          >
            Itinerary
          </TabsTrigger>
          <TabsTrigger value="map" className="data-[state=active]:bg-white data-[state=active]:text-yovu-charcoal">
            Map View
          </TabsTrigger>
          <TabsTrigger value="timeline" className="data-[state=active]:bg-white data-[state=active]:text-yovu-charcoal">
            Timeline
          </TabsTrigger>
          <TabsTrigger value="summary" className="data-[state=active]:bg-white data-[state=active]:text-yovu-charcoal">
            Summary
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {activeTab === "itinerary" && (
        <div className="grid grid-cols-1 gap-6">
          {selectedItems.length === 0 ? (
            <Card className="p-8 text-center">
              <h3 className="text-xl font-bold text-yovu-charcoal mb-4">Your Journey is Empty</h3>
              <p className="text-yovu-charcoal/70 mb-6">
                Start building your sustainable travel experience by adding items from our search results.
              </p>
              <Button className="bg-yovu-charcoal text-white hover:bg-yovu-charcoal/90">
                <Plus className="h-4 w-4 mr-2" /> Search for Experiences
              </Button>
            </Card>
          ) : (
            Object.entries(groupedItems).map(([type, items]) => (
              <Card key={type} className="overflow-hidden border-yovu-mint">
                <CardHeader className="bg-yovu-mint/10 pb-3">
                  <CardTitle className="text-lg text-yovu-charcoal">{getTypeLabel(type)}</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className={`bg-white border rounded-md p-4 ${
                          editingItemId === item.id ? "border-yovu-mint ring-1 ring-yovu-mint" : "border-gray-200"
                        }`}
                      >
                        {editingItemId === item.id ? (
                          <div className="space-y-4">
                            <div className="flex justify-between items-start">
                              <h3 className="font-bold text-yovu-charcoal">{item.title}</h3>
                              <Badge className="bg-yovu-mint text-yovu-charcoal">
                                {item.currency} {item.price} per unit
                              </Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="quantity">Quantity</Label>
                                <Input
                                  id="quantity"
                                  type="number"
                                  min="1"
                                  value={editForm.quantity}
                                  onChange={(e) =>
                                    setEditForm({ ...editForm, quantity: Number.parseInt(e.target.value) || 1 })
                                  }
                                  className="mt-1"
                                />
                              </div>

                              {(item.type === "accommodation" || item.type === "activity") && (
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <Label>Start Date</Label>
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <Button
                                          variant="outline"
                                          className={cn(
                                            "w-full justify-start text-left font-normal mt-1",
                                            !editForm.startDate && "text-muted-foreground",
                                          )}
                                        >
                                          <Calendar className="mr-2 h-4 w-4" />
                                          {editForm.startDate ? (
                                            format(editForm.startDate, "PPP")
                                          ) : (
                                            <span>Pick a date</span>
                                          )}
                                        </Button>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-auto p-0">
                                        <CalendarComponent
                                          mode="single"
                                          selected={editForm.startDate}
                                          onSelect={(date) => setEditForm({ ...editForm, startDate: date })}
                                          initialFocus
                                        />
                                      </PopoverContent>
                                    </Popover>
                                  </div>
                                  <div>
                                    <Label>End Date</Label>
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <Button
                                          variant="outline"
                                          className={cn(
                                            "w-full justify-start text-left font-normal mt-1",
                                            !editForm.endDate && "text-muted-foreground",
                                          )}
                                        >
                                          <Calendar className="mr-2 h-4 w-4" />
                                          {editForm.endDate ? (
                                            format(editForm.endDate, "PPP")
                                          ) : (
                                            <span>Pick a date</span>
                                          )}
                                        </Button>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-auto p-0">
                                        <CalendarComponent
                                          mode="single"
                                          selected={editForm.endDate}
                                          onSelect={(date) => setEditForm({ ...editForm, endDate: date })}
                                          initialFocus
                                        />
                                      </PopoverContent>
                                    </Popover>
                                  </div>
                                </div>
                              )}
                            </div>

                            <div>
                              <Label htmlFor="notes">Notes</Label>
                              <Textarea
                                id="notes"
                                value={editForm.notes}
                                onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                                className="mt-1"
                                rows={3}
                              />
                            </div>

                            <div className="flex justify-end gap-2 mt-2">
                              <Button variant="outline" onClick={handleCancelEdit}>
                                Cancel
                              </Button>
                              <Button onClick={handleSaveEdit} className="bg-yovu-charcoal hover:bg-yovu-charcoal/90">
                                <Save className="h-4 w-4 mr-2" /> Save Changes
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-bold text-yovu-charcoal">{item.title}</h3>
                                <p className="text-sm text-yovu-charcoal/70 mt-1">{item.description}</p>
                              </div>
                              <Badge className="bg-yovu-mint text-yovu-charcoal">
                                {item.currency} {item.price * (item.quantity || 1)}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-yovu-charcoal/70" />
                                <span className="text-sm text-yovu-charcoal/70">{item.location}</span>
                              </div>

                              {item.quantity && item.quantity > 1 && (
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4 text-yovu-charcoal/70" />
                                  <span className="text-sm text-yovu-charcoal/70">Quantity: {item.quantity}</span>
                                </div>
                              )}

                              {item.startDate && item.endDate && (
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-yovu-charcoal/70" />
                                  <span className="text-sm text-yovu-charcoal/70">
                                    {format(item.startDate, "MMM d")} - {format(item.endDate, "MMM d, yyyy")}
                                  </span>
                                </div>
                              )}

                              {item.type === "activity" && item.duration_hours && (
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-yovu-charcoal/70" />
                                  <span className="text-sm text-yovu-charcoal/70">
                                    Duration: {item.duration_hours} hour{item.duration_hours > 1 ? "s" : ""}
                                  </span>
                                </div>
                              )}
                            </div>

                            {item.notes && (
                              <div className="mt-3 p-3 bg-gray-50 rounded-md">
                                <p className="text-sm text-yovu-charcoal/70">
                                  <span className="font-medium">Notes:</span> {item.notes}
                                </p>
                              </div>
                            )}

                            <div className="flex flex-wrap gap-2 mt-4">
                              {item.sustainabilityFeatures.map((feature, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="bg-yovu-charcoal/10 border-yovu-charcoal/30"
                                >
                                  <Leaf className="h-3 w-3 mr-1 text-green-500" />
                                  {feature
                                    .split("-")
                                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                    .join(" ")}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex justify-end gap-2 mt-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" /> Remove
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditItem(item.id)}
                                className="text-yovu-charcoal border-yovu-mint/50 hover:bg-yovu-mint/10"
                              >
                                <Edit className="h-4 w-4 mr-2" /> Edit
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {activeTab === "map" && (
        <Card className="p-6 text-center">
          <h3 className="text-xl font-bold text-yovu-charcoal mb-4">Map View Coming Soon</h3>
          <p className="text-yovu-charcoal/70">
            Soon you'll be able to visualize your entire journey on an interactive map.
          </p>
        </Card>
      )}

      {activeTab === "timeline" && (
        <Card className="p-6 text-center">
          <h3 className="text-xl font-bold text-yovu-charcoal mb-4">Timeline View Coming Soon</h3>
          <p className="text-yovu-charcoal/70">Soon you'll be able to see your journey as a day-by-day timeline.</p>
        </Card>
      )}

      {activeTab === "summary" && (
        <Card className="p-6 text-center">
          <h3 className="text-xl font-bold text-yovu-charcoal mb-4">Journey Summary Coming Soon</h3>
          <p className="text-yovu-charcoal/70">
            Soon you'll be able to see a complete summary of your sustainable journey.
          </p>
        </Card>
      )}
    </div>
  )
}
