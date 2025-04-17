"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Calendar,
  Compass,
  Leaf,
  Plane,
  Bed,
  Utensils,
  Bike,
  Car,
  Users,
  ArrowRight,
  Check,
} from "lucide-react"
import { FlightSearchForm, type FlightSearchParams } from "@/components/journey/flight-search-form"

// Types for our journey
type JourneyElement = {
  type: "destination" | "activity" | "accommodation" | "dining" | "transportation" | "flight"
  selected: boolean
  details?: any
}

export function ExperienceBuilder() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("destination")
  const [journeyElements, setJourneyElements] = useState<JourneyElement[]>([
    { type: "destination", selected: false },
    { type: "activity", selected: false },
    { type: "accommodation", selected: false },
    { type: "dining", selected: false },
    { type: "transportation", selected: false },
    { type: "flight", selected: false },
  ])

  // Destination state
  const [destination, setDestination] = useState("")
  const [travelDates, setTravelDates] = useState({ start: "", end: "" })
  const [travelers, setTravelers] = useState(2)
  const [budget, setBudget] = useState([500, 5000])
  const [sustainabilityLevel, setSustainabilityLevel] = useState(80)

  // Activity preferences
  const [activityPreferences, setActivityPreferences] = useState<string[]>([])

  // Accommodation preferences
  const [accommodationType, setAccommodationType] = useState<string[]>([])

  // Transportation preferences
  const [transportationTypes, setTransportationTypes] = useState<string[]>([])

  // Dining preferences
  const [diningPreferences, setDiningPreferences] = useState<string[]>([])

  // Flight search parameters
  const [flightParams, setFlightParams] = useState<FlightSearchParams>({
    tripType: "round-trip",
    origin: "",
    destination: "",
    departureDate: undefined,
    returnDate: undefined,
    passengers: {
      adults: 1,
      children: 0,
      infants: 0,
    },
    cabinClass: "economy",
    directFlightsOnly: false,
    flexibleDates: false,
    preferredAirlines: [],
    baggageIncluded: true,
    sustainableOnly: true,
  })

  const updateJourneyElement = (type: JourneyElement["type"], selected: boolean, details?: any) => {
    setJourneyElements((prev) =>
      prev.map((element) =>
        element.type === type ? { ...element, selected, details: details || element.details } : element,
      ),
    )
  }

  const handleNextTab = () => {
    switch (activeTab) {
      case "destination":
        updateJourneyElement("destination", true, { destination, travelDates, travelers, budget, sustainabilityLevel })
        setActiveTab("activities")
        break
      case "activities":
        updateJourneyElement("activity", true, { preferences: activityPreferences })
        setActiveTab("accommodation")
        break
      case "accommodation":
        updateJourneyElement("accommodation", true, { types: accommodationType })
        setActiveTab("dining")
        break
      case "dining":
        updateJourneyElement("dining", true, { preferences: diningPreferences })
        setActiveTab("transportation")
        break
      case "transportation":
        updateJourneyElement("transportation", true, { types: transportationTypes })
        setActiveTab("flight")
        break
      case "flight":
        updateJourneyElement("flight", true, { params: flightParams })
        setActiveTab("summary")
        break
      case "summary":
        // Navigate to results
        const params = new URLSearchParams()
        params.append("destination", destination)
        params.append("startDate", travelDates.start)
        params.append("endDate", travelDates.end)
        params.append("travelers", travelers.toString())
        params.append("minBudget", budget[0].toString())
        params.append("maxBudget", budget[1].toString())
        params.append("sustainability", sustainabilityLevel.toString())

        activityPreferences.forEach((pref) => params.append("activity", pref))
        accommodationType.forEach((type) => params.append("accommodation", type))
        diningPreferences.forEach((pref) => params.append("dining", pref))
        transportationTypes.forEach((type) => params.append("transportation", type))

        // Add flight parameters
        params.append("tripType", flightParams.tripType)
        params.append("origin", flightParams.origin)
        params.append("flightDestination", flightParams.destination)

        if (flightParams.departureDate) {
          params.append("departureDate", flightParams.departureDate.toISOString())
        }

        if (flightParams.returnDate) {
          params.append("returnDate", flightParams.returnDate.toISOString())
        }

        params.append("adults", flightParams.passengers.adults.toString())
        params.append("children", flightParams.passengers.children.toString())
        params.append("infants", flightParams.passengers.infants.toString())
        params.append("cabinClass", flightParams.cabinClass)
        params.append("directFlightsOnly", flightParams.directFlightsOnly.toString())
        params.append("flexibleDates", flightParams.flexibleDates.toString())
        params.append("baggageIncluded", flightParams.baggageIncluded.toString())
        params.append("sustainableOnly", flightParams.sustainableOnly.toString())

        flightParams.preferredAirlines.forEach((airline) => {
          params.append("airline", airline)
        })

        router.push(`/design-journey/results?${params.toString()}`)
        break
    }
  }

  const handlePrevTab = () => {
    switch (activeTab) {
      case "activities":
        setActiveTab("destination")
        break
      case "accommodation":
        setActiveTab("activities")
        break
      case "dining":
        setActiveTab("accommodation")
        break
      case "transportation":
        setActiveTab("dining")
        break
      case "flight":
        setActiveTab("transportation")
        break
      case "summary":
        setActiveTab("flight")
        break
    }
  }

  const toggleActivityPreference = (preference: string) => {
    setActivityPreferences((prev) =>
      prev.includes(preference) ? prev.filter((p) => p !== preference) : [...prev, preference],
    )
  }

  const toggleAccommodationType = (type: string) => {
    setAccommodationType((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const toggleTransportationType = (type: string) => {
    setTransportationTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const toggleDiningPreference = (preference: string) => {
    setDiningPreferences((prev) =>
      prev.includes(preference) ? prev.filter((p) => p !== preference) : [...prev, preference],
    )
  }

  const handleFlightSearch = (params: FlightSearchParams) => {
    setFlightParams(params)
  }

  const isNextDisabled = () => {
    switch (activeTab) {
      case "destination":
        return !destination || !travelDates.start || !travelDates.end
      case "activities":
        return activityPreferences.length === 0
      case "accommodation":
        return accommodationType.length === 0
      case "dining":
        return diningPreferences.length === 0
      case "transportation":
        return transportationTypes.length === 0
      case "flight":
        return (
          !flightParams.origin ||
          !flightParams.destination ||
          !flightParams.departureDate ||
          (flightParams.tripType === "round-trip" && !flightParams.returnDate)
        )
      default:
        return false
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-yovu-charcoal mb-2">Design Your Sustainable Journey</h1>
        <p className="text-yovu-charcoal/80">Build your perfect eco-friendly travel experience step by step</p>
      </div>

      {/* Journey Progress */}
      <div className="flex justify-between mb-8 px-4">
        {["destination", "activities", "accommodation", "dining", "transportation", "flight", "summary"].map(
          (step, index) => (
            <div
              key={step}
              className={`flex flex-col items-center ${activeTab === step ? "opacity-100" : "opacity-60"}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 
                ${
                  activeTab === step
                    ? "bg-yovu-charcoal text-white"
                    : journeyElements.some(
                          (el) =>
                            (el.type === step ||
                              (step === "activities" && el.type === "activity") ||
                              (step === "summary" && index === 6)) &&
                            el.selected,
                        )
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {journeyElements.some(
                  (el) =>
                    (el.type === step ||
                      (step === "activities" && el.type === "activity") ||
                      (step === "summary" && index === 6)) &&
                    el.selected,
                ) ? (
                  <Check className="w-5 h-5" />
                ) : (
                  index + 1
                )}
              </div>
              <span className="text-xs text-center capitalize">{step}</span>
            </div>
          ),
        )}
      </div>

      <Card className="border-yovu-mint">
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Destination Tab */}
            <TabsContent value="destination" className="mt-0">
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-yovu-charcoal">
                  <MapPin className="h-5 w-5" />
                  <h2 className="text-xl font-semibold">Where would you like to go?</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="destination">Destination</Label>
                    <Input
                      id="destination"
                      placeholder="City, region, or country"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="border-yovu-mint"
                    />

                    <div className="flex flex-wrap gap-2 mt-2">
                      {["Costa Rica", "Norway", "New Zealand", "Slovenia", "Bhutan", "Portugal"].map((place) => (
                        <Button
                          key={place}
                          variant="outline"
                          size="sm"
                          onClick={() => setDestination(place)}
                          className={`rounded-full ${destination === place ? "bg-yovu-mint text-yovu-charcoal" : "border-yovu-mint"}`}
                        >
                          {place}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>When are you traveling?</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="start-date" className="text-sm">
                          Start date
                        </Label>
                        <Input
                          id="start-date"
                          type="date"
                          value={travelDates.start}
                          onChange={(e) => setTravelDates({ ...travelDates, start: e.target.value })}
                          className="border-yovu-mint"
                        />
                      </div>
                      <div>
                        <Label htmlFor="end-date" className="text-sm">
                          End date
                        </Label>
                        <Input
                          id="end-date"
                          type="date"
                          value={travelDates.end}
                          onChange={(e) => setTravelDates({ ...travelDates, end: e.target.value })}
                          className="border-yovu-mint"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  <div className="space-y-3">
                    <Label htmlFor="travelers">Number of travelers</Label>
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setTravelers((prev) => Math.max(1, prev - 1))}
                        className="border-yovu-mint"
                      >
                        -
                      </Button>
                      <span className="mx-4 font-medium">{travelers}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setTravelers((prev) => prev + 1)}
                        className="border-yovu-mint"
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Budget range (USD)</Label>
                    <Slider
                      defaultValue={budget}
                      min={100}
                      max={10000}
                      step={100}
                      onValueChange={(value) => setBudget(value as [number, number])}
                    />
                    <div className="flex justify-between text-sm">
                      <span>${budget[0]}</span>
                      <span>${budget[1]}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Label>Sustainability priority</Label>
                      <Leaf className="h-4 w-4 text-green-500" />
                    </div>
                    <Slider
                      defaultValue={[sustainabilityLevel]}
                      min={0}
                      max={100}
                      step={10}
                      onValueChange={(value) => setSustainabilityLevel(value[0])}
                    />
                    <div className="flex justify-between text-sm">
                      <span>Balanced</span>
                      <span>Eco-focused</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Activities Tab */}
            <TabsContent value="activities" className="mt-0">
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-yovu-charcoal">
                  <Compass className="h-5 w-5" />
                  <h2 className="text-xl font-semibold">What activities interest you?</h2>
                </div>

                <p className="text-yovu-charcoal/70">
                  Select the activities you'd like to experience during your journey.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { id: "nature", label: "Nature & Wildlife", icon: "🌿" },
                    { id: "adventure", label: "Adventure", icon: "🧗‍♂️" },
                    { id: "cultural", label: "Cultural Experiences", icon: "🏛️" },
                    { id: "wellness", label: "Wellness & Spa", icon: "🧘‍♀️" },
                    { id: "food", label: "Food & Cooking", icon: "🍳" },
                    { id: "water", label: "Water Activities", icon: "🏄‍♂️" },
                    { id: "hiking", label: "Hiking & Trekking", icon: "🥾" },
                    { id: "photography", label: "Photography", icon: "📸" },
                    { id: "volunteer", label: "Volunteering", icon: "🤝" },
                  ].map((activity) => (
                    <div
                      key={activity.id}
                      onClick={() => toggleActivityPreference(activity.id)}
                      className={`
                        p-4 rounded-lg border-2 cursor-pointer transition-all
                        ${
                          activityPreferences.includes(activity.id)
                            ? "border-yovu-charcoal bg-yovu-mint/20"
                            : "border-gray-200 hover:border-yovu-mint"
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{activity.icon}</span>
                        <span className="font-medium">{activity.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Accommodation Tab */}
            <TabsContent value="accommodation" className="mt-0">
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-yovu-charcoal">
                  <Bed className="h-5 w-5" />
                  <h2 className="text-xl font-semibold">Where would you like to stay?</h2>
                </div>

                <p className="text-yovu-charcoal/70">Select your preferred accommodation types.</p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { id: "eco-lodge", label: "Eco Lodge", icon: "🏡" },
                    { id: "boutique-hotel", label: "Boutique Hotel", icon: "🏨" },
                    { id: "homestay", label: "Local Homestay", icon: "🏠" },
                    { id: "glamping", label: "Glamping", icon: "⛺" },
                    { id: "treehouse", label: "Treehouse", icon: "🌳" },
                    { id: "farm-stay", label: "Farm Stay", icon: "🚜" },
                  ].map((type) => (
                    <div
                      key={type.id}
                      onClick={() => toggleAccommodationType(type.id)}
                      className={`
                        p-4 rounded-lg border-2 cursor-pointer transition-all
                        ${
                          accommodationType.includes(type.id)
                            ? "border-yovu-charcoal bg-yovu-mint/20"
                            : "border-gray-200 hover:border-yovu-mint"
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{type.icon}</span>
                        <span className="font-medium">{type.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Dining Tab */}
            <TabsContent value="dining" className="mt-0">
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-yovu-charcoal">
                  <Utensils className="h-5 w-5" />
                  <h2 className="text-xl font-semibold">What are your dining preferences?</h2>
                </div>

                <p className="text-yovu-charcoal/70">Select your dining preferences for your journey.</p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { id: "local-cuisine", label: "Local Cuisine", icon: "🍲" },
                    { id: "farm-to-table", label: "Farm-to-Table", icon: "🌱" },
                    { id: "vegetarian", label: "Vegetarian", icon: "🥗" },
                    { id: "vegan", label: "Vegan", icon: "🥬" },
                    { id: "organic", label: "Organic", icon: "🌿" },
                    { id: "food-tour", label: "Food Tours", icon: "🧆" },
                  ].map((preference) => (
                    <div
                      key={preference.id}
                      onClick={() => toggleDiningPreference(preference.id)}
                      className={`
                        p-4 rounded-lg border-2 cursor-pointer transition-all
                        ${
                          diningPreferences.includes(preference.id)
                            ? "border-yovu-charcoal bg-yovu-mint/20"
                            : "border-gray-200 hover:border-yovu-mint"
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{preference.icon}</span>
                        <span className="font-medium">{preference.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Transportation Tab */}
            <TabsContent value="transportation" className="mt-0">
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-yovu-charcoal">
                  <Car className="h-5 w-5" />
                  <h2 className="text-xl font-semibold">How would you like to get around?</h2>
                </div>

                <p className="text-yovu-charcoal/70">Select your preferred transportation methods.</p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { id: "electric-vehicle", label: "Electric Vehicle", icon: <Car className="h-5 w-5" /> },
                    { id: "public-transit", label: "Public Transit", icon: <Car className="h-5 w-5" /> },
                    { id: "bicycle", label: "Bicycle", icon: <Bike className="h-5 w-5" /> },
                    { id: "walking", label: "Walking Tours", icon: "🚶" },
                    { id: "train", label: "Train", icon: "🚆" },
                    { id: "boat", label: "Boat", icon: "⛵" },
                    { id: "shared-shuttle", label: "Shared Shuttle", icon: "🚐" },
                    { id: "eco-flight", label: "Eco-Friendly Flight", icon: <Plane className="h-5 w-5" /> },
                  ].map((type) => (
                    <div
                      key={type.id}
                      onClick={() => toggleTransportationType(type.id)}
                      className={`
                        p-4 rounded-lg border-2 cursor-pointer transition-all
                        ${
                          transportationTypes.includes(type.id)
                            ? "border-yovu-charcoal bg-yovu-mint/20"
                            : "border-gray-200 hover:border-yovu-mint"
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        {typeof type.icon === "string" ? <span className="text-2xl">{type.icon}</span> : type.icon}
                        <span className="font-medium">{type.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Flight Search Tab */}
            <TabsContent value="flight" className="mt-0">
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-yovu-charcoal">
                  <Plane className="h-5 w-5" />
                  <h2 className="text-xl font-semibold">Find Sustainable Flights</h2>
                </div>

                <p className="text-yovu-charcoal/70">
                  Search for eco-friendly flights with carbon offset options. Please provide all required information to
                  find the best flight options.
                </p>

                <div className="space-y-4">
                  <div className="bg-yovu-mint/10 p-4 rounded-lg mb-6">
                    <h3 className="font-medium text-yovu-charcoal mb-2">Your Journey Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-yovu-charcoal" />
                        <span>
                          <strong>Destination:</strong> {destination}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-yovu-charcoal" />
                        <span>
                          <strong>Dates:</strong> {new Date(travelDates.start).toLocaleDateString()} -{" "}
                          {new Date(travelDates.end).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <FlightSearchForm
                    onSearch={handleFlightSearch}
                    initialValues={{
                      tripType: "round-trip",
                      origin: "",
                      destination: destination,
                      departureDate: travelDates.start ? new Date(travelDates.start) : undefined,
                      returnDate: travelDates.end ? new Date(travelDates.end) : undefined,
                      passengers: {
                        adults: travelers,
                        children: 0,
                        infants: 0,
                      },
                      cabinClass: "economy",
                      directFlightsOnly: false,
                      flexibleDates: false,
                      preferredAirlines: [],
                      baggageIncluded: true,
                      sustainableOnly: true,
                    }}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Summary Tab */}
            <TabsContent value="summary" className="mt-0">
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-yovu-charcoal">
                  <Check className="h-5 w-5" />
                  <h2 className="text-xl font-semibold">Your Journey Summary</h2>
                </div>

                <div className="bg-yovu-mint/20 p-4 rounded-lg">
                  <h3 className="font-medium text-yovu-charcoal mb-2">Destination & Dates</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-yovu-charcoal" />
                      <span>{destination}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-yovu-charcoal" />
                      <span>
                        {new Date(travelDates.start).toLocaleDateString()} -{" "}
                        {new Date(travelDates.end).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-yovu-charcoal" />
                      <span>{travelers} travelers</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Leaf className="h-4 w-4 text-green-500" />
                      <span>Sustainability priority: {sustainabilityLevel}%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-yovu-charcoal">Activities</h3>
                    <div className="flex flex-wrap gap-2">
                      {activityPreferences.map((pref) => (
                        <Badge key={pref} className="bg-yovu-mint text-yovu-charcoal">
                          {pref
                            .split("-")
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ")}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-yovu-charcoal">Accommodation</h3>
                    <div className="flex flex-wrap gap-2">
                      {accommodationType.map((type) => (
                        <Badge key={type} className="bg-yovu-mint text-yovu-charcoal">
                          {type
                            .split("-")
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ")}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-yovu-charcoal">Dining</h3>
                    <div className="flex flex-wrap gap-2">
                      {diningPreferences.map((pref) => (
                        <Badge key={pref} className="bg-yovu-mint text-yovu-charcoal">
                          {pref
                            .split("-")
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ")}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-yovu-charcoal">Transportation</h3>
                    <div className="flex flex-wrap gap-2">
                      {transportationTypes.map((type) => (
                        <Badge key={type} className="bg-yovu-mint text-yovu-charcoal">
                          {type
                            .split("-")
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ")}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-yovu-mint/20 p-4 rounded-lg">
                  <h3 className="font-medium text-yovu-charcoal mb-2">Flight Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Plane className="h-4 w-4 text-yovu-charcoal" />
                      <span>
                        {flightParams.origin} → {flightParams.destination}
                        {flightParams.tripType === "round-trip" ? " (Round Trip)" : ""}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-yovu-charcoal" />
                      <span>
                        {flightParams.departureDate?.toLocaleDateString()}
                        {flightParams.returnDate && ` - ${flightParams.returnDate.toLocaleDateString()}`}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-yovu-charcoal" />
                      <span>
                        {flightParams.passengers.adults} {flightParams.passengers.adults === 1 ? "adult" : "adults"}
                        {flightParams.passengers.children > 0 &&
                          `, ${flightParams.passengers.children} ${flightParams.passengers.children === 1 ? "child" : "children"}`}
                        {flightParams.passengers.infants > 0 &&
                          `, ${flightParams.passengers.infants} ${flightParams.passengers.infants === 1 ? "infant" : "infants"}`}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-yovu-mint text-yovu-charcoal">
                        {flightParams.cabinClass.charAt(0).toUpperCase() +
                          flightParams.cabinClass.slice(1).replace("-", " ")}
                      </Badge>
                      {flightParams.directFlightsOnly && (
                        <Badge className="bg-yovu-mint text-yovu-charcoal">Direct Flights Only</Badge>
                      )}
                      {flightParams.baggageIncluded && (
                        <Badge className="bg-yovu-mint text-yovu-charcoal">Baggage Included</Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-yovu-mint/20 p-4 rounded-lg">
                  <h3 className="font-medium text-yovu-charcoal mb-2">Budget</h3>
                  <p>
                    ${budget[0]} - ${budget[1]} USD
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between mt-8">
            {activeTab !== "destination" ? (
              <Button variant="outline" onClick={handlePrevTab} className="border-yovu-charcoal text-yovu-charcoal">
                Back
              </Button>
            ) : (
              <div></div>
            )}

            <Button onClick={handleNextTab} disabled={isNextDisabled()} className="bg-yovu-charcoal text-white">
              {activeTab === "summary" ? (
                "Find Sustainable Options"
              ) : (
                <>
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
