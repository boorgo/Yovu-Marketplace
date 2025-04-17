import { format } from "date-fns"
import { Leaf } from "lucide-react"

interface DestinationHeaderProps {
  destination: string
  fromDate?: Date
  toDate?: Date
  travelers: number
}

export function DestinationHeader({ destination, fromDate, toDate, travelers }: DestinationHeaderProps) {
  return (
    <div className="bg-yovu-charcoal text-white py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{destination}</h1>
            <div className="flex items-center text-white/80 mb-4">
              <Leaf className="h-4 w-4 mr-2" />
              <span>Sustainability Score: 92/100</span>
            </div>
            <p className="text-white/90 max-w-2xl">
              Discover sustainable travel options in {destination}. From eco-friendly accommodations to low-impact
              activities, find everything you need for a responsible journey.
            </p>
          </div>

          <div className="mt-4 md:mt-0 bg-white/10 p-4 rounded-lg text-white/90">
            <div className="text-sm">Your search:</div>
            <div className="font-medium">
              {fromDate && toDate ? (
                <>
                  {format(fromDate, "MMM d")} - {format(toDate, "MMM d, yyyy")}
                </>
              ) : fromDate ? (
                <>From {format(fromDate, "MMM d, yyyy")}</>
              ) : (
                "Any dates"
              )}
              {" • "}
              {travelers} {travelers === 1 ? "traveler" : "travelers"}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
