"use client"

import { useState } from "react"
import { FlightSearchForm, type FlightSearchParams } from "@/components/journey/flight-search-form"
import { Card, CardContent } from "@/components/ui/card"
import { Plane } from "lucide-react"

interface FlightSearchStepProps {
  onComplete: (flightParams: FlightSearchParams) => void
  initialValues?: Partial<FlightSearchParams>
}

export function FlightSearchStep({ onComplete, initialValues }: FlightSearchStepProps) {
  const [expanded, setExpanded] = useState(true)

  const handleSearch = (params: FlightSearchParams) => {
    onComplete(params)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-yovu-charcoal">
        <Plane className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Flight Search</h2>
      </div>

      <p className="text-yovu-charcoal/70">
        Search for sustainable flights with our airline partners. All required information helps us find the most
        eco-friendly options for your journey.
      </p>

      <Card className="border-yovu-mint">
        <CardContent className="p-6">
          <FlightSearchForm onSearch={handleSearch} initialValues={initialValues} />
        </CardContent>
      </Card>
    </div>
  )
}
