import { format } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plane, Calendar, Users, Leaf } from "lucide-react"

interface JourneySummaryProps {
  journeyData: {
    origin: string
    destination: string
    departureDate: Date | undefined
    returnDate: Date | undefined
    travelers: {
      adults: number
      children: number
      infants: number
    }
    flightPreferences: {
      cabinClass: string
      directFlightsOnly: boolean
      sustainabilityOptions: string[]
    }
  }
}

export function JourneySummary({ journeyData }: JourneySummaryProps) {
  const formatCabinClass = (cabinClass: string) => {
    switch (cabinClass) {
      case "economy":
        return "Economy"
      case "premium-economy":
        return "Premium Economy"
      case "business":
        return "Business"
      case "first":
        return "First Class"
      default:
        return cabinClass
    }
  }

  const formatSustainabilityOption = (option: string) => {
    switch (option) {
      case "carbon-offset":
        return "Carbon Offset"
      case "eco-friendly-airlines":
        return "Eco-Friendly Airlines"
      case "sustainable-fuel":
        return "Sustainable Aviation Fuel"
      default:
        return option
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-yovu-mint">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Plane className="h-5 w-5 text-yovu-charcoal" />
            <h3 className="font-medium text-yovu-charcoal">Flight Details</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-yovu-charcoal/70">From</p>
              <p className="font-medium text-yovu-charcoal">{journeyData.origin}</p>
            </div>

            <div>
              <p className="text-sm text-yovu-charcoal/70">To</p>
              <p className="font-medium text-yovu-charcoal">{journeyData.destination}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 mt-6 mb-4">
            <Calendar className="h-5 w-5 text-yovu-charcoal" />
            <h3 className="font-medium text-yovu-charcoal">Travel Dates</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-yovu-charcoal/70">Departure</p>
              <p className="font-medium text-yovu-charcoal">
                {journeyData.departureDate ? format(journeyData.departureDate, "EEE, MMM d, yyyy") : "Not selected"}
              </p>
            </div>

            {journeyData.returnDate && (
              <div>
                <p className="text-sm text-yovu-charcoal/70">Return</p>
                <p className="font-medium text-yovu-charcoal">{format(journeyData.returnDate, "EEE, MMM d, yyyy")}</p>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-3 mt-6 mb-4">
            <Users className="h-5 w-5 text-yovu-charcoal" />
            <h3 className="font-medium text-yovu-charcoal">Travelers</h3>
          </div>

          <div className="space-y-2">
            <p className="text-yovu-charcoal">
              {journeyData.travelers.adults} {journeyData.travelers.adults === 1 ? "adult" : "adults"}
              {journeyData.travelers.children > 0 &&
                `, ${journeyData.travelers.children} ${journeyData.travelers.children === 1 ? "child" : "children"}`}
              {journeyData.travelers.infants > 0 &&
                `, ${journeyData.travelers.infants} ${journeyData.travelers.infants === 1 ? "infant" : "infants"}`}
            </p>
          </div>

          <div className="flex items-center space-x-3 mt-6 mb-4">
            <Leaf className="h-5 w-5 text-yovu-charcoal" />
            <h3 className="font-medium text-yovu-charcoal">Preferences</h3>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-yovu-charcoal/70">Cabin Class</p>
              <p className="font-medium text-yovu-charcoal">
                {formatCabinClass(journeyData.flightPreferences.cabinClass)}
              </p>
            </div>

            <div>
              <p className="text-sm text-yovu-charcoal/70">Flight Type</p>
              <p className="font-medium text-yovu-charcoal">
                {journeyData.flightPreferences.directFlightsOnly
                  ? "Direct flights only"
                  : "Any (including connections)"}
              </p>
            </div>

            <div>
              <p className="text-sm text-yovu-charcoal/70">Sustainability Options</p>
              {journeyData.flightPreferences.sustainabilityOptions.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-1">
                  {journeyData.flightPreferences.sustainabilityOptions.map((option) => (
                    <Badge key={option} className="bg-yovu-mint/30 text-yovu-charcoal border-none">
                      {formatSustainabilityOption(option)}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-yovu-charcoal">None selected</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="p-4 bg-yovu-mint/20 rounded-md">
        <p className="text-sm text-yovu-charcoal">
          <span className="font-medium">Next steps:</span> We'll search for the most sustainable flight options based on
          your preferences. After selecting your flights, you'll be able to add accommodations, activities, and
          transportation to complete your journey.
        </p>
      </div>
    </div>
  )
}
