import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"

export function TravelOptions() {
  return (
    <section className="w-full bg-yovu-mint py-16 md:py-24" id="travel-options">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter text-yovu-charcoal mb-4">
            Discover Sustainable Travel Options
          </h2>
          <p className="text-yovu-charcoal/80 max-w-[800px] mx-auto text-lg">
            Browse our curated selection of verified sustainable accommodations, activities, and transportation options.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Eco Lodge */}
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="relative h-48">
              <img
                src="/placeholder.svg?height=200&width=400"
                alt="Eco Lodge in Costa Rica"
                className="h-full w-full object-cover"
              />
              <Badge className="absolute top-3 right-3 bg-yovu-charcoal text-white">Accommodation</Badge>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-yovu-charcoal">Rainforest Eco Lodge</h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="ml-1 text-yovu-charcoal font-medium">4.9</span>
                </div>
              </div>
              <p className="text-yovu-charcoal/70 mb-2">Costa Rica</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="bg-yovu-mint/30 text-yovu-charcoal border-yovu-mint">
                  Solar Powered
                </Badge>
                <Badge variant="outline" className="bg-yovu-mint/30 text-yovu-charcoal border-yovu-mint">
                  Rainwater Harvesting
                </Badge>
                <Badge variant="outline" className="bg-yovu-mint/30 text-yovu-charcoal border-yovu-mint">
                  Farm-to-Table
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm text-yovu-charcoal/70">Carbon Footprint</span>
                  <div className="font-bold text-yovu-charcoal">-85% vs. Average</div>
                </div>
                <div className="text-xl font-bold text-yovu-charcoal">$120/night</div>
              </div>
            </div>
          </div>

          {/* Hiking Tour */}
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="relative h-48">
              <img
                src="/placeholder.svg?height=200&width=400"
                alt="Sustainable Hiking Tour"
                className="h-full w-full object-cover"
              />
              <Badge className="absolute top-3 right-3 bg-yovu-charcoal text-white">Activity</Badge>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-yovu-charcoal">Guided Forest Hike</h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="ml-1 text-yovu-charcoal font-medium">4.8</span>
                </div>
              </div>
              <p className="text-yovu-charcoal/70 mb-2">Norway</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="bg-yovu-mint/30 text-yovu-charcoal border-yovu-mint">
                  Local Guides
                </Badge>
                <Badge variant="outline" className="bg-yovu-mint/30 text-yovu-charcoal border-yovu-mint">
                  Leave No Trace
                </Badge>
                <Badge variant="outline" className="bg-yovu-mint/30 text-yovu-charcoal border-yovu-mint">
                  Wildlife Protection
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm text-yovu-charcoal/70">Community Impact</span>
                  <div className="font-bold text-yovu-charcoal">$45 to Local Economy</div>
                </div>
                <div className="text-xl font-bold text-yovu-charcoal">$85/person</div>
              </div>
            </div>
          </div>

          {/* Electric Vehicle */}
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="relative h-48">
              <img
                src="/placeholder.svg?height=200&width=400"
                alt="Electric Vehicle Rental"
                className="h-full w-full object-cover"
              />
              <Badge className="absolute top-3 right-3 bg-yovu-charcoal text-white">Transportation</Badge>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-yovu-charcoal">Electric Vehicle Rental</h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="ml-1 text-yovu-charcoal font-medium">4.7</span>
                </div>
              </div>
              <p className="text-yovu-charcoal/70 mb-2">Portugal</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="bg-yovu-mint/30 text-yovu-charcoal border-yovu-mint">
                  Zero Emissions
                </Badge>
                <Badge variant="outline" className="bg-yovu-mint/30 text-yovu-charcoal border-yovu-mint">
                  Renewable Energy
                </Badge>
                <Badge variant="outline" className="bg-yovu-mint/30 text-yovu-charcoal border-yovu-mint">
                  Carbon Offset
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm text-yovu-charcoal/70">Carbon Saved</span>
                  <div className="font-bold text-yovu-charcoal">15kg CO2 per day</div>
                </div>
                <div className="text-xl font-bold text-yovu-charcoal">$65/day</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <Button asChild className="bg-yovu-charcoal text-white">
            <Link href="/explore">
              Explore All Options <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
