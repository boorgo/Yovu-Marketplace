import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Map } from "lucide-react"

export function JourneyLink() {
  return (
    <section className="w-full bg-yovu-mint py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-yovu-charcoal">
            Design Your Sustainable Journey
          </h2>
          <p className="text-yovu-charcoal/90 max-w-[700px]">
            Our comprehensive travel search engine helps you find and book all sustainable travel options in one place.
            From eco-friendly flights to sustainable accommodations, activities, and transportation, design your perfect
            journey with real-time impact tracking.
          </p>
          <Button asChild size="lg" className="bg-yovu-charcoal text-white mt-4">
            <Link href="/design-journey" className="flex items-center">
              <Map className="mr-2 h-5 w-5" /> Start Designing
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
