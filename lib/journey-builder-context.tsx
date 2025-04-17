"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { JourneyResult } from "@/lib/mock-journey-results"

type JourneyItem = JourneyResult & {
  startDate?: Date
  endDate?: Date
  quantity?: number
  notes?: string
}

interface JourneyBuilderContextType {
  selectedItems: JourneyItem[]
  addItem: (item: JourneyResult) => void
  removeItem: (itemId: string) => void
  updateItem: (itemId: string, updates: Partial<JourneyItem>) => void
  clearItems: () => void
  totalPrice: number
  totalSustainabilityScore: number
}

const JourneyBuilderContext = createContext<JourneyBuilderContextType | undefined>(undefined)

export function JourneyBuilderProvider({ children }: { children: React.ReactNode }) {
  const [selectedItems, setSelectedItems] = useState<JourneyItem[]>([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalSustainabilityScore, setTotalSustainabilityScore] = useState(0)

  // Calculate totals whenever selected items change
  useEffect(() => {
    if (selectedItems.length === 0) {
      setTotalPrice(0)
      setTotalSustainabilityScore(0)
      return
    }

    const price = selectedItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
    setTotalPrice(price)

    const avgSustainability =
      selectedItems.reduce((sum, item) => sum + item.sustainabilityScore, 0) / selectedItems.length
    setTotalSustainabilityScore(Math.round(avgSustainability))
  }, [selectedItems])

  // Add an item to the journey
  const addItem = (item: JourneyResult) => {
    // Check if item already exists
    const existingItemIndex = selectedItems.findIndex((i) => i.id === item.id)

    if (existingItemIndex >= 0) {
      // If item exists, increment quantity
      const updatedItems = [...selectedItems]
      const existingItem = updatedItems[existingItemIndex]
      updatedItems[existingItemIndex] = {
        ...existingItem,
        quantity: (existingItem.quantity || 1) + 1,
      }
      setSelectedItems(updatedItems)
    } else {
      // Otherwise add new item
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }])
    }
  }

  // Remove an item from the journey
  const removeItem = (itemId: string) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== itemId))
  }

  // Update an item in the journey
  const updateItem = (itemId: string, updates: Partial<JourneyItem>) => {
    setSelectedItems(selectedItems.map((item) => (item.id === itemId ? { ...item, ...updates } : item)))
  }

  // Clear all items
  const clearItems = () => {
    setSelectedItems([])
  }

  return (
    <JourneyBuilderContext.Provider
      value={{
        selectedItems,
        addItem,
        removeItem,
        updateItem,
        clearItems,
        totalPrice,
        totalSustainabilityScore,
      }}
    >
      {children}
    </JourneyBuilderContext.Provider>
  )
}

export function useJourneyBuilder() {
  const context = useContext(JourneyBuilderContext)
  if (context === undefined) {
    throw new Error("useJourneyBuilder must be used within a JourneyBuilderProvider")
  }
  return context
}
