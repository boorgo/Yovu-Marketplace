"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, ArrowLeft, Search } from "lucide-react"
import { OriginDestinationStep } from "@/components/journey/wizard-steps/origin-destination-step"
import { FlightDetailsStep } from "@/components/journey/wizard-steps/flight-details-step"
import { SearchSummaryStep } from "@/components/journey/wizard-steps/search-summary-step"

type SearchStep = "origin-destination" | "flight-details" | "summary"

export function TravelSearchWizard() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<SearchStep>("origin-destination")
  const [searchData, setSearchData] = useState({
    origin: "",
    destination: "",
    departureDate: undefined as Date | undefined,
    returnDate: undefined as Date | undefined,
    tripType: "round-trip" as "round-trip" | "one-way",
    travelers: {
      adults: 1,
      children: 0,
      infants: 0,
    },
    cabinClass: "economy" as "economy" | "premium-economy" | "business" | "first",
    directFlightsOnly: false,
  })

  const updateSearchData = (data: Partial<typeof searchData>) => {
    setSearchData((prev) => ({ ...prev, ...data }))
  }

  const goToNextStep = () => {
    switch (currentStep) {
      case "origin-destination":
        setCurrentStep("flight-details")
        break
      case "flight-details":
        setCurrentStep("summary")
        break
      case "summary":
        // Navigate to results
        const params = new URLSearchParams()
        params.append("origin", searchData.origin)
        params.append("destination", searchData.destination)
        if (searchData.departureDate) params.append("departureDate", searchData.departureDate.toISOString())
        if (searchData.returnDate) params.append("returnDate", searchData.returnDate.toISOString())
        params.append("tripType", searchData.tripType)
        params.append("adults", searchData.travelers.adults.toString())
        params.append("children", searchData.travelers.children.toString())
        params.append("infants", searchData.travelers.infants.toString())
        params.append("cabinClass", searchData.cabinClass)
        params.append("directFlightsOnly", searchData.directFlightsOnly.toString())

        router.push(`/design-journey/results?${params.toString()}`)
        break
    }
  }

  const goToPreviousStep = () => {
    switch (currentStep) {
      case "flight-details":
        setCurrentStep("origin-destination")
        break
      case "summary":
        setCurrentStep("flight-details")
        break
    }
  }

  const getProgressPercentage = () => {
    switch (currentStep) {
      case "origin-destination":
        return 33
      case "flight-details":
        return 66
      case "summary":
        return 100
    }
  }

  const isNextDisabled = () => {
    switch (currentStep) {
      case "origin-destination":
        return (
          !searchData.origin ||
          !searchData.destination ||
          !searchData.departureDate ||
          (searchData.tripType === "round-trip" && !searchData.returnDate)
        )
      default:
        return false
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-yovu-charcoal mb-2">Design Your Sustainable Journey</h1>
        <p className="text-yovu-charcoal/80">Let's build your trip step by step, starting with your travel details.</p>
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
            {currentStep === "origin-destination" && "Where and when are you traveling?"}
            {currentStep === "flight-details" && "Flight details"}
            {currentStep === "summary" && "Review your search"}
          </CardTitle>
          <CardDescription>
            {currentStep === "origin-destination" && "Enter your origin, destination, and travel dates"}
            {currentStep === "flight-details" && "Customize your flight preferences"}
            {currentStep === "summary" && "Review your journey search details"}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          {currentStep === "origin-destination" && (
            <OriginDestinationStep
              origin={searchData.origin}
              destination={searchData.destination}
              departureDate={searchData.departureDate}
              returnDate={searchData.returnDate}
              tripType={searchData.tripType}
              onChange={(data) => updateSearchData(data)}
            />
          )}

          {currentStep === "flight-details" && (
            <FlightDetailsStep
              travelers={searchData.travelers}
              cabinClass={searchData.cabinClass}
              directFlightsOnly={searchData.directFlightsOnly}
              onChange={(data) => updateSearchData(data)}
            />
          )}

          {currentStep === "summary" && <SearchSummaryStep searchData={searchData} />}
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
                <Search className="mr-2 h-4 w-4" /> Search Flights
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
