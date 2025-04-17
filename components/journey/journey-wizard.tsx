"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { OriginDestinationStep } from "@/components/journey/steps/origin-destination-step"
import { DateSelectionStep } from "@/components/journey/steps/date-selection-step"
import { TravelersStep } from "@/components/journey/steps/travelers-step"
import { FlightPreferencesStep } from "@/components/journey/steps/flight-preferences-step"
import { JourneySummary } from "@/components/journey/journey-summary"
import { ArrowRight, ArrowLeft, Check } from "lucide-react"
import { Progress } from "@/components/ui/progress"

type JourneyStep = "origin-destination" | "dates" | "travelers" | "flight-preferences" | "summary"

export function JourneyWizard() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<JourneyStep>("origin-destination")
  const [journeyData, setJourneyData] = useState({
    origin: "",
    destination: "",
    departureDate: undefined as Date | undefined,
    returnDate: undefined as Date | undefined,
    travelers: {
      adults: 1,
      children: 0,
      infants: 0,
    },
    flightPreferences: {
      cabinClass: "economy",
      directFlightsOnly: false,
      sustainabilityOptions: [] as string[],
    },
  })

  const updateJourneyData = (data: Partial<typeof journeyData>) => {
    setJourneyData((prev) => ({ ...prev, ...data }))
  }

  const goToNextStep = () => {
    switch (currentStep) {
      case "origin-destination":
        setCurrentStep("dates")
        break
      case "dates":
        setCurrentStep("travelers")
        break
      case "travelers":
        setCurrentStep("flight-preferences")
        break
      case "flight-preferences":
        setCurrentStep("summary")
        break
      case "summary":
        // Navigate to results
        const params = new URLSearchParams()
        params.append("origin", journeyData.origin)
        params.append("destination", journeyData.destination)
        if (journeyData.departureDate) params.append("departureDate", journeyData.departureDate.toISOString())
        if (journeyData.returnDate) params.append("returnDate", journeyData.returnDate.toISOString())
        params.append("adults", journeyData.travelers.adults.toString())
        params.append("children", journeyData.travelers.children.toString())
        params.append("infants", journeyData.travelers.infants.toString())
        params.append("cabinClass", journeyData.flightPreferences.cabinClass)
        params.append("directFlightsOnly", journeyData.flightPreferences.directFlightsOnly.toString())
        if (journeyData.flightPreferences.sustainabilityOptions.length > 0) {
          params.append("sustainabilityOptions", journeyData.flightPreferences.sustainabilityOptions.join(","))
        }

        router.push(`/journey/flights?${params.toString()}`)
        break
    }
  }

  const goToPreviousStep = () => {
    switch (currentStep) {
      case "dates":
        setCurrentStep("origin-destination")
        break
      case "travelers":
        setCurrentStep("dates")
        break
      case "flight-preferences":
        setCurrentStep("travelers")
        break
      case "summary":
        setCurrentStep("flight-preferences")
        break
    }
  }

  const getProgressPercentage = () => {
    switch (currentStep) {
      case "origin-destination":
        return 20
      case "dates":
        return 40
      case "travelers":
        return 60
      case "flight-preferences":
        return 80
      case "summary":
        return 100
    }
  }

  const isNextDisabled = () => {
    switch (currentStep) {
      case "origin-destination":
        return !journeyData.origin || !journeyData.destination
      case "dates":
        return !journeyData.departureDate
      default:
        return false
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-yovu-charcoal mb-2">Design Your Sustainable Journey</h1>
        <p className="text-yovu-charcoal/80">Let's build your trip step by step, starting with your flight details.</p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-yovu-charcoal/70">Progress</span>
          <span className="text-sm font-medium text-yovu-charcoal">{getProgressPercentage()}%</span>
        </div>
        <Progress value={getProgressPercentage()} className="h-2" />
      </div>

      <Card className="border-yovu-mint">
        <CardHeader className="bg-yovu-mint/30">
          <CardTitle className="text-yovu-charcoal">
            {currentStep === "origin-destination" && "Where are you traveling?"}
            {currentStep === "dates" && "When are you traveling?"}
            {currentStep === "travelers" && "Who is traveling?"}
            {currentStep === "flight-preferences" && "Flight preferences"}
            {currentStep === "summary" && "Journey summary"}
          </CardTitle>
          <CardDescription>
            {currentStep === "origin-destination" && "Enter your origin and destination"}
            {currentStep === "dates" && "Select your travel dates"}
            {currentStep === "travelers" && "Add your travel companions"}
            {currentStep === "flight-preferences" && "Customize your flight experience"}
            {currentStep === "summary" && "Review your journey details"}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          {currentStep === "origin-destination" && (
            <OriginDestinationStep
              origin={journeyData.origin}
              destination={journeyData.destination}
              onChange={(origin, destination) => updateJourneyData({ origin, destination })}
            />
          )}

          {currentStep === "dates" && (
            <DateSelectionStep
              departureDate={journeyData.departureDate}
              returnDate={journeyData.returnDate}
              onChange={(departureDate, returnDate) => updateJourneyData({ departureDate, returnDate })}
            />
          )}

          {currentStep === "travelers" && (
            <TravelersStep
              travelers={journeyData.travelers}
              onChange={(travelers) => updateJourneyData({ travelers })}
            />
          )}

          {currentStep === "flight-preferences" && (
            <FlightPreferencesStep
              preferences={journeyData.flightPreferences}
              onChange={(flightPreferences) => updateJourneyData({ flightPreferences })}
            />
          )}

          {currentStep === "summary" && <JourneySummary journeyData={journeyData} />}
        </CardContent>

        <CardFooter className="flex justify-between border-t border-yovu-mint/30 p-4">
          {currentStep !== "origin-destination" ? (
            <Button variant="outline" onClick={goToPreviousStep} className="border-yovu-charcoal text-yovu-charcoal">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          ) : (
            <div></div> // Empty div to maintain spacing
          )}

          <Button onClick={goToNextStep} disabled={isNextDisabled()} className="bg-yovu-charcoal text-white">
            {currentStep === "summary" ? (
              <>
                <Check className="mr-2 h-4 w-4" /> Find Flights
              </>
            ) : (
              <>
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
