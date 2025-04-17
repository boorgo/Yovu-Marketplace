export interface JourneyResult {
  id: string
  type: "flight" | "accommodation" | "activity" | "restaurant" | "transportation"
  title: string
  description: string
  image?: string
  price: number
  currency: string
  sustainabilityScore: number
  sustainabilityFeatures: string[]
  rating: number
  location: string
  tags?: string[] // Added tags for filtering by preferences

  // Flight specific
  airline?: string
  departureTime?: string
  arrivalTime?: string
  duration?: string
  stops?: number
  cabinClass?: string

  // Accommodation specific
  checkIn?: string
  checkOut?: string
  amenities?: string[]

  // Activity specific
  duration_hours?: number
  included?: string[]
}

export const mockJourneyResults: JourneyResult[] = [
  // Accommodations
  {
    id: "acc-1",
    type: "accommodation",
    title: "Eco Treehouse Retreat",
    description:
      "Sustainable treehouse with panoramic forest views, built with reclaimed materials and powered by solar energy.",
    image: "/placeholder.svg?height=300&width=400",
    price: 150,
    currency: "$",
    sustainabilityScore: 95,
    sustainabilityFeatures: ["eco-certified", "renewable-energy", "locally-owned", "carbon-neutral"],
    rating: 4.8,
    location: "Costa Rica",
    checkIn: "3:00 PM",
    checkOut: "11:00 AM",
    amenities: ["Free WiFi", "Organic breakfast", "Rainwater harvesting", "Composting toilet", "Farm-to-table dining"],
    tags: ["eco-lodge", "treehouse"],
  },
  {
    id: "acc-2",
    type: "accommodation",
    title: "Sustainable Beachfront Villa",
    description: "Eco-friendly beachfront villa with zero-waste policies and community-based tourism initiatives.",
    image: "/placeholder.svg?height=300&width=400",
    price: 280,
    currency: "$",
    sustainabilityScore: 88,
    sustainabilityFeatures: ["plastic-free", "community-impact", "renewable-energy"],
    rating: 4.6,
    location: "Portugal",
    checkIn: "2:00 PM",
    checkOut: "10:00 AM",
    amenities: ["Ocean view", "Organic garden", "Electric vehicle charging", "Locally-sourced furnishings"],
    tags: ["boutique-hotel"],
  },
  {
    id: "acc-3",
    type: "accommodation",
    title: "Mountain Eco-Lodge",
    description: "Carbon-neutral mountain lodge with traditional architecture and farm-to-table restaurant.",
    image: "/placeholder.svg?height=300&width=400",
    price: 120,
    currency: "$",
    sustainabilityScore: 92,
    sustainabilityFeatures: ["carbon-neutral", "eco-certified", "locally-owned"],
    rating: 4.7,
    location: "Slovenia",
    checkIn: "3:00 PM",
    checkOut: "11:00 AM",
    amenities: ["Hiking trails", "Organic meals", "Wood-fired heating", "Guided nature walks"],
    tags: ["eco-lodge", "farm-stay"],
  },

  // Activities
  {
    id: "act-1",
    type: "activity",
    title: "Rainforest Conservation Tour",
    description:
      "Guided tour through protected rainforest with a conservation biologist, learning about ecosystem restoration.",
    image: "/placeholder.svg?height=300&width=400",
    price: 65,
    currency: "$",
    sustainabilityScore: 98,
    sustainabilityFeatures: ["eco-certified", "community-impact", "carbon-neutral"],
    rating: 4.9,
    location: "Costa Rica",
    duration_hours: 4,
    included: ["Guide", "Transportation", "Donation to conservation"],
    tags: ["nature", "volunteer"],
  },
  {
    id: "act-2",
    type: "activity",
    title: "Sustainable Cooking Class",
    description:
      "Learn to cook traditional dishes using locally-sourced, organic ingredients with zero waste practices.",
    image: "/placeholder.svg?height=300&width=400",
    price: 45,
    currency: "$",
    sustainabilityScore: 90,
    sustainabilityFeatures: ["locally-owned", "plastic-free", "community-impact"],
    rating: 4.7,
    location: "Portugal",
    duration_hours: 3,
    included: ["Ingredients", "Recipe book", "Meal", "Organic wine tasting"],
    tags: ["food", "cultural"],
  },
  {
    id: "act-3",
    type: "activity",
    title: "Mountain Biking Adventure",
    description: "Guided mountain biking tour through scenic trails with focus on responsible outdoor recreation.",
    image: "/placeholder.svg?height=300&width=400",
    price: 55,
    currency: "$",
    sustainabilityScore: 85,
    sustainabilityFeatures: ["eco-certified", "carbon-neutral"],
    rating: 4.6,
    location: "Slovenia",
    duration_hours: 5,
    included: ["Bike rental", "Helmet", "Guide", "Packed lunch"],
    tags: ["adventure", "hiking"],
  },

  // Restaurants
  {
    id: "rest-1",
    type: "restaurant",
    title: "Farm-to-Table Organic Restaurant",
    description: "Zero-waste restaurant serving organic dishes made with ingredients from their own permaculture farm.",
    image: "/placeholder.svg?height=300&width=400",
    price: 35,
    currency: "$",
    sustainabilityScore: 96,
    sustainabilityFeatures: ["eco-certified", "locally-owned", "plastic-free"],
    rating: 4.8,
    location: "Costa Rica",
    tags: ["farm-to-table", "organic", "vegetarian"],
  },
  {
    id: "rest-2",
    type: "restaurant",
    title: "Sustainable Seafood Bistro",
    description:
      "Restaurant committed to serving only sustainably-caught seafood and supporting local fishing communities.",
    image: "/placeholder.svg?height=300&width=400",
    price: 50,
    currency: "$",
    sustainabilityScore: 88,
    sustainabilityFeatures: ["eco-certified", "community-impact"],
    rating: 4.5,
    location: "Portugal",
    tags: ["local-cuisine", "food-tour"],
  },
  {
    id: "rest-3",
    type: "restaurant",
    title: "Plant-Based Alpine Kitchen",
    description: "Vegan restaurant using seasonal, local produce with zero-waste philosophy and community garden.",
    image: "/placeholder.svg?height=300&width=400",
    price: 30,
    currency: "$",
    sustainabilityScore: 94,
    sustainabilityFeatures: ["carbon-neutral", "plastic-free", "renewable-energy"],
    rating: 4.7,
    location: "Slovenia",
    tags: ["vegan", "organic"],
  },

  // Transportation
  {
    id: "trans-1",
    type: "transportation",
    title: "Electric Vehicle Rental",
    description: "Zero-emission electric vehicle rental with solar-powered charging stations throughout the region.",
    image: "/placeholder.svg?height=300&width=400",
    price: 45,
    currency: "$",
    sustainabilityScore: 95,
    sustainabilityFeatures: ["carbon-neutral", "renewable-energy"],
    rating: 4.6,
    location: "Costa Rica",
    tags: ["electric-vehicle"],
  },
  {
    id: "trans-2",
    type: "transportation",
    title: "Eco-Friendly Boat Tour",
    description: "Solar-electric powered boat tour along the coastline with marine conservation education.",
    image: "/placeholder.svg?height=300&width=400",
    price: 40,
    currency: "$",
    sustainabilityScore: 90,
    sustainabilityFeatures: ["eco-certified", "renewable-energy", "community-impact"],
    rating: 4.7,
    location: "Portugal",
    tags: ["boat"],
  },
  {
    id: "trans-3",
    type: "transportation",
    title: "Hybrid Shuttle Service",
    description: "Shared shuttle service using hybrid vehicles connecting major tourist destinations.",
    image: "/placeholder.svg?height=300&width=400",
    price: 25,
    currency: "$",
    sustainabilityScore: 85,
    sustainabilityFeatures: ["carbon-neutral", "community-impact"],
    rating: 4.5,
    location: "Slovenia",
    tags: ["shared-shuttle"],
  },

  // Flights
  {
    id: "flight-1",
    type: "flight",
    title: "Eco-Friendly Flight to Costa Rica",
    description: "Flight with carbon offset program and sustainable aviation fuel blend.",
    image: "/placeholder.svg?height=300&width=400",
    price: 450,
    currency: "$",
    sustainabilityScore: 75,
    sustainabilityFeatures: ["carbon-neutral", "eco-certified"],
    rating: 4.2,
    location: "San José, Costa Rica",
    airline: "Green Airways",
    departureTime: "08:30",
    arrivalTime: "14:45",
    duration: "6h 15m",
    stops: 0,
    cabinClass: "economy",
    tags: ["eco-flight"],
  },
  {
    id: "flight-2",
    type: "flight",
    title: "Sustainable Flight to Lisbon",
    description: "Direct flight with airline committed to reducing emissions and plastic-free service.",
    image: "/placeholder.svg?height=300&width=400",
    price: 380,
    currency: "$",
    sustainabilityScore: 70,
    sustainabilityFeatures: ["plastic-free", "carbon-neutral"],
    rating: 4.0,
    location: "Lisbon, Portugal",
    airline: "Eco Atlantic",
    departureTime: "10:15",
    arrivalTime: "15:30",
    duration: "5h 15m",
    stops: 0,
    cabinClass: "economy",
    tags: ["eco-flight"],
  },
  {
    id: "flight-3",
    type: "flight",
    title: "Green Flight to Ljubljana",
    description: "Flight with newest fuel-efficient aircraft and comprehensive sustainability program.",
    image: "/placeholder.svg?height=300&width=400",
    price: 320,
    currency: "$",
    sustainabilityScore: 72,
    sustainabilityFeatures: ["carbon-neutral", "eco-certified"],
    rating: 4.1,
    location: "Ljubljana, Slovenia",
    airline: "Alpine Air",
    departureTime: "07:45",
    arrivalTime: "13:20",
    duration: "5h 35m",
    stops: 1,
    cabinClass: "economy",
    tags: ["eco-flight"],
  },
]
