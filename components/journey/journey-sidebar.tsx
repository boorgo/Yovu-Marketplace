"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, MapPin, Users, Leaf, Trash, Edit2, Save, X, ChevronUp, ChevronDown } from "lucide-react"
import { format } from "date-fns"
import { useJourneyBuilder } from "@/lib/journey-builder-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import type { SearchConfig } from "@/components/journey/journey-results-container"

interface JourneySidebarProps {
  searchConfig: SearchConfig
}

export function JourneySidebar({ searchConfig }: JourneySidebarProps) {
  const { selectedItems, removeItem, updateItem, totalPrice, totalSustainabilityScore } = useJourneyBuilder()
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
  const [isExpanded, setIsExpanded] = useState(true)

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
    <Card className="sticky top-4 border-yovu-mint">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-yovu-charcoal">Your Journey</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="h-8 w-8 p-0">
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <>
          <CardContent className="pb-2">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-yovu-charcoal" />
                <span className="text-sm text-yovu-charcoal">{searchConfig.destination}</span>
              </div>

              {searchConfig.startDate && searchConfig.endDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-yovu-charcoal" />
                  <span className="text-sm text-yovu-charcoal">
                    {format(searchConfig.startDate, "MMM d")} - {format(searchConfig.endDate, "MMM d, yyyy")}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-yovu-charcoal" />
                <span className="text-sm text-yovu-charcoal">{searchConfig.travelers} Travelers</span>
              </div>

              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-green-500" />
                <span className="text-sm text-yovu-charcoal">
                  Sustainability Level: {searchConfig.sustainabilityLevel}/5
                </span>
              </div>

              <Separator />

              {selectedItems.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-sm text-yovu-charcoal/70">
                    Your journey is empty. Add items from the results to start building your sustainable travel
                    experience.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {Object.entries(groupedItems).map(([type, items]) => (
                    <div key={type}>
                      <h3 className="font-medium text-yovu-charcoal mb-2">{getTypeLabel(type)}</h3>
                      <div className="space-y-3">
                        {items.map((item) => (
                          <div key={item.id} className="bg-white border border-yovu-mint/30 rounded-md p-3 text-sm">
                            {editingItemId === item.id ? (
                              <div className="space-y-3">
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
                                            <CalendarIcon className="mr-2 h-4 w-4" />
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
                                            <CalendarIcon className="mr-2 h-4 w-4" />
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
                                  <Button variant="outline" size="sm" onClick={handleCancelEdit} className="h-8">
                                    <X className="h-3 w-3 mr-1" /> Cancel
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={handleSaveEdit}
                                    className="h-8 bg-yovu-charcoal hover:bg-yovu-charcoal/90"
                                  >
                                    <Save className="h-3 w-3 mr-1" /> Save
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="flex justify-between items-start">
                                  <div className="font-medium">{item.title}</div>
                                  <Badge className="bg-yovu-mint text-yovu-charcoal">
                                    {item.currency} {item.price * (item.quantity || 1)}
                                  </Badge>
                                </div>

                                {item.quantity && item.quantity > 1 && (
                                  <div className="text-yovu-charcoal/70 mt-1">Quantity: {item.quantity}</div>
                                )}

                                {item.startDate && item.endDate && (
                                  <div className="text-yovu-charcoal/70 mt-1">
                                    {format(item.startDate, "MMM d")} - {format(item.endDate, "MMM d")}
                                  </div>
                                )}

                                {item.notes && <div className="text-yovu-charcoal/70 mt-1">Notes: {item.notes}</div>}

                                <div className="flex justify-end gap-2 mt-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeItem(item.id)}
                                    className="h-7 text-red-500 hover:text-red-600 hover:bg-red-50 p-0 px-2"
                                  >
                                    <Trash className="h-3 w-3 mr-1" /> Remove
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleEditItem(item.id)}
                                    className="h-7 text-yovu-charcoal hover:bg-yovu-mint/10 p-0 px-2"
                                  >
                                    <Edit2 className="h-3 w-3 mr-1" /> Edit
                                  </Button>
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex-col">
            <Separator className="mb-4" />

            <div className="w-full space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-yovu-charcoal">Total Price:</span>
                <span className="font-bold text-yovu-charcoal">${totalPrice}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-yovu-charcoal">Sustainability Score:</span>
                <Badge className="bg-yovu-charcoal">
                  <Leaf className="h-3 w-3 mr-1" />
                  {totalSustainabilityScore}%
                </Badge>
              </div>

              <Button
                className="w-full mt-2 bg-yovu-mint text-yovu-charcoal hover:bg-yovu-mint/90"
                disabled={selectedItems.length === 0}
              >
                Finalize Journey
              </Button>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  )
}
