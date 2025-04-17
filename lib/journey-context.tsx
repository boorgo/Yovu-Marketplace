"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define types for journey items
export type JourneyItemType = "accommodation" | "activity" | "restaurant" | "transportation" | "flight"

export interface JourneyItem {
  id: string
  type: JourneyItemType
  name: string
  price: number
  sustainabilityScore: number
  carbonFootprint: number
  image?: string
  location?: string
  dates?: {
    start: string
    end?: string
  }
}

interface JourneyContextType {
  items: JourneyItem[]
  addItem: (item: JourneyItem) => void
  removeItem: (itemId: string) => void
  clearItems: () => void
  totalPrice: number
  averageSustainabilityScore: number
  totalCarbonFootprint: number
}

const JourneyContext = createContext<JourneyContextType | undefined>(undefined)

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<JourneyItem[]>([])

  // Load items from localStorage on initial render
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem("journeyItems")
      if (savedItems) {
        setItems(JSON.parse(savedItems))
      }
    } catch (error) {
      console.error("Error loading journey items from localStorage:", error)
      // If there's an error, initialize with empty array
      setItems([])
    }
  }, [])

  // Save items to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("journeyItems", JSON.stringify(items))
    } catch (error) {
      console.error("Error saving journey items to localStorage:", error)
    }
  }, [items])

  const addItem = (item: JourneyItem) => {
    setItems((prevItems) => {
      // Ensure prevItems is an array
      const currentItems = Array.isArray(prevItems) ? prevItems : []
      return [...currentItems, item]
    })
  }

  const removeItem = (itemId: string) => {
    setItems((prevItems) => {
      // Ensure prevItems is an array
      const currentItems = Array.isArray(prevItems) ? prevItems : []
      return currentItems.filter((item) => item.id !== itemId)
    })
  }

  const clearItems = () => {
    setItems([])
  }

  // Calculate totals
  const totalPrice = Array.isArray(items) ? items.reduce((sum, item) => sum + item.price, 0) : 0

  const averageSustainabilityScore =
    Array.isArray(items) && items.length > 0
      ? items.reduce((sum, item) => sum + item.sustainabilityScore, 0) / items.length
      : 0

  const totalCarbonFootprint = Array.isArray(items) ? items.reduce((sum, item) => sum + item.carbonFootprint, 0) : 0

  return (
    <JourneyContext.Provider
      value={{
        items: Array.isArray(items) ? items : [],
        addItem,
        removeItem,
        clearItems,
        totalPrice,
        averageSustainabilityScore,
        totalCarbonFootprint,
      }}
    >
      {children}
    </JourneyContext.Provider>
  )
}

export function useJourney() {
  const context = useContext(JourneyContext)
  if (context === undefined) {
    throw new Error("useJourney must be used within a JourneyProvider")
  }
  return context
}
