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

interface JourneyBuilderContextType {
  items: JourneyItem[]
  addItem: (item: JourneyItem) => void
  removeItem: (itemId: string) => void
  clearItems: () => void
  totalPrice: number
  averageSustainabilityScore: number
  totalCarbonFootprint: number
  destination: string | null
  setDestination: (destination: string) => void
  dates: {
    start: string | null
    end: string | null
  }
  setDates: (dates: { start: string | null; end: string | null }) => void
  travelers: number
  setTravelers: (count: number) => void
}

const JourneyBuilderContext = createContext<JourneyBuilderContextType | undefined>(undefined)

export function JourneyBuilderProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<JourneyItem[]>([])
  const [destination, setDestination] = useState<string | null>(null)
  const [dates, setDates] = useState<{ start: string | null; end: string | null }>({
    start: null,
    end: null,
  })
  const [travelers, setTravelers] = useState<number>(1)

  // Load journey data from localStorage on initial render
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem("journeyBuilderItems")
      const savedDestination = localStorage.getItem("journeyBuilderDestination")
      const savedDates = localStorage.getItem("journeyBuilderDates")
      const savedTravelers = localStorage.getItem("journeyBuilderTravelers")

      if (savedItems) {
        setItems(JSON.parse(savedItems))
      }
      if (savedDestination) {
        setDestination(savedDestination)
      }
      if (savedDates) {
        setDates(JSON.parse(savedDates))
      }
      if (savedTravelers) {
        setTravelers(Number.parseInt(savedTravelers, 10))
      }
    } catch (error) {
      console.error("Error loading journey data from localStorage:", error)
      // If there's an error, initialize with defaults
      setItems([])
      setDestination(null)
      setDates({ start: null, end: null })
      setTravelers(1)
    }
  }, [])

  // Save journey data to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("journeyBuilderItems", JSON.stringify(items))
      if (destination) {
        localStorage.setItem("journeyBuilderDestination", destination)
      }
      localStorage.setItem("journeyBuilderDates", JSON.stringify(dates))
      localStorage.setItem("journeyBuilderTravelers", travelers.toString())
    } catch (error) {
      console.error("Error saving journey data to localStorage:", error)
    }
  }, [items, destination, dates, travelers])

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
    <JourneyBuilderContext.Provider
      value={{
        items: Array.isArray(items) ? items : [],
        addItem,
        removeItem,
        clearItems,
        totalPrice,
        averageSustainabilityScore,
        totalCarbonFootprint,
        destination,
        setDestination,
        dates,
        setDates,
        travelers,
        setTravelers,
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
