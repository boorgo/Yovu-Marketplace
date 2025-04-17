import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, Plus, ShoppingCart } from "lucide-react"

export function JourneyIntro() {
  return (
    <div className="max-w-4xl mx-auto mt-16">
      <h2 className="text-2xl font-bold text-yovu-charcoal text-center mb-8">How It Works</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-yovu-mint">
          <CardContent className="pt-6 px-4 pb-4 text-center">
            <div className="w-12 h-12 bg-yovu-mint/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-6 w-6 text-yovu-charcoal" />
            </div>
            <h3 className="font-bold text-yovu-charcoal mb-2">Search</h3>
            <p className="text-sm text-yovu-charcoal/80">
              Enter your origin, destination, dates, and number of travelers
            </p>
          </CardContent>
        </Card>

        <Card className="border-yovu-mint">
          <CardContent className="pt-6 px-4 pb-4 text-center">
            <div className="w-12 h-12 bg-yovu-mint/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="h-6 w-6 text-yovu-charcoal" />
            </div>
            <h3 className="font-bold text-yovu-charcoal mb-2">Filter</h3>
            <p className="text-sm text-yovu-charcoal/80">
              Refine results by service type, sustainability features, and price
            </p>
          </CardContent>
        </Card>

        <Card className="border-yovu-mint">
          <CardContent className="pt-6 px-4 pb-4 text-center">
            <div className="w-12 h-12 bg-yovu-mint/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="h-6 w-6 text-yovu-charcoal" />
            </div>
            <h3 className="font-bold text-yovu-charcoal mb-2">Add</h3>
            <p className="text-sm text-yovu-charcoal/80">
              Select flights, accommodations, activities, and more for your journey
            </p>
          </CardContent>
        </Card>

        <Card className="border-yovu-mint">
          <CardContent className="pt-6 px-4 pb-4 text-center">
            <div className="w-12 h-12 bg-yovu-mint/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="h-6 w-6 text-yovu-charcoal" />
            </div>
            <h3 className="font-bold text-yovu-charcoal mb-2">Book</h3>
            <p className="text-sm text-yovu-charcoal/80">Complete your booking with real-time impact tracking</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
