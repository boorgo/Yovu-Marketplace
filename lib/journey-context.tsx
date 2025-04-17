"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface JourneyItem {
  id: string
  type: string
  title: string
  price: number
  sustainabilityScore: number
  carbonSaved: number
  natureImpact?: number
  communityImpact?: number
  [key: string]: any
}

interface JourneyContextType {
  journey: {
    accommodation?: JourneyItem
    activities: JourneyItem[]
    transportation?: JourneyItem
    restaurants: JourneyItem[]
    flight?: JourneyItem
  }
  addToJourney: (item: JourneyItem) => void
  removeFromJourney: (type: string, id?: string) => void
  clearJourney: () => void
  getJourneyImpact: () => {
    carbonSaved: number
    sustainabilityScore: number
    totalCost: number
    communityImpact: number
  }
}

const JourneyContext = createContext<JourneyContextType | undefined>(undefined)

const EMPTY_JOURNEY = {
  accommodation: undefined,
  activities: [],
  transportation: undefined,
  restaurants: [],
  flight: undefined,
}

export function JourneyProvider({ children }: { children: React.ReactNode }) {
  // Try to load journey from localStorage
  const [journey, setJourney] = useState<JourneyContextType["journey"]>(EMPTY_JOURNEY)

  // Load journey from localStorage on initial render
  useEffect(() => {
    const savedJourney = localStorage.getItem("yovu-journey")
    if (savedJourney) {
      try {
        setJourney(JSON.parse(savedJourney))
      } catch (error) {
        console.error("Failed to parse saved journey:", error)
      }
    }
  }, [])

  // Save journey to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("yovu-journey", JSON.stringify(journey))
  }, [journey])

  const addToJourney = (item: JourneyItem) => {
    setJourney((prev) => {
      // Handle different item types
      switch (item.type) {
        case "accommodation":
          return { ...prev, accommodation: item }
        case "activity":
          return { ...prev, activities: [...prev.activities, item] }
        case "transportation":
          return { ...prev, transportation: item }
        case "restaurant":
          return { ...prev, restaurants: [...prev.restaurants, item] }
        case "flight":
          return { ...prev, flight: item }
        default:
          return prev
      }
    })
  }

  const removeFromJourney = (type: string, id?: string) => {
    setJourney((prev) => {
      switch (type) {
        case "accommodation":
          return { ...prev, accommodation: undefined }
        case "activity":
          return {
            ...prev,
            activities: prev.activities.filter((item) => item.id !== id),
          }
        case "transportation":
          return { ...prev, transportation: undefined }
        case "restaurant":
          return {
            ...prev,
            restaurants: prev.restaurants.filter((item) => item.id !== id),
          }
        case "flight":
          return { ...prev, flight: undefined }
        default:
          return prev
      }
    })
  }

  const clearJourney = () => {
    setJourney(EMPTY_JOURNEY)
  }

  const getJourneyImpact = () => {
    let carbonSaved = 0
    let sustainabilityScore = 0
    let totalCost = 0
    let communityImpact = 0
    let itemCount = 0

    // Calculate accommodation impact
    if (journey.accommodation) {
      carbonSaved += journey.accommodation.carbonSaved || 0
      sustainabilityScore += journey.accommodation.sustainabilityScore || 0
      totalCost += journey.accommodation.price || 0
      communityImpact += journey.accommodation.communityImpact || 0
      itemCount++
    }

    // Calculate activities impact
    journey.activities.forEach((activity) => {
      carbonSaved += activity.carbonSaved || 0
      sustainabilityScore += activity.sustainabilityScore || 0
      totalCost += activity.price || 0
      communityImpact += activity.communityImpact || 0
      itemCount++
    })

    // Calculate transportation impact
    if (journey.transportation) {
      carbonSaved += journey.transportation.carbonSaved || 0
      sustainabilityScore += journey.transportation.sustainabilityScore || 0
      totalCost += journey.transportation.price || 0
      communityImpact += journey.transportation.communityImpact || 0
      itemCount++
    }

    // Calculate restaurants impact
    journey.restaurants.forEach((restaurant) => {
      carbonSaved += restaurant.carbonSaved || 0
      sustainabilityScore += restaurant.sustainabilityScore || 0
      totalCost += restaurant.price || 0
      communityImpact += restaurant.communityImpact || 0
      itemCount++
    })

    // Calculate flight impact
    if (journey.flight) {
      carbonSaved += journey.flight.carbonSaved || 0
      sustainabilityScore += journey.flight.sustainabilityScore || 0
      totalCost += journey.flight.price || 0
      communityImpact += journey.flight.communityImpact || 0
      itemCount++
    }

    // Calculate average sustainability score
    const avgSustainabilityScore = itemCount > 0 ? Math.round(sustainabilityScore / itemCount) : 0

    return {
      carbonSaved,
      sustainabilityScore: avgSustainabilityScore,
      totalCost,
      communityImpact,
    }
  }

  return (
    <JourneyContext.Provider
      value={{
        journey,
        addToJourney,
        removeFromJourney,
        clearJourney,
        getJourneyImpact,
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
