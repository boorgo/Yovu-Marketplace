import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export function DestinationLink() {
  return (
    <section className="w-full bg-yovu-mint py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-yovu-charcoal">
            Explore Sustainable Destinations
          </h2>
          <p className="text-yovu-charcoal/90 max-w-[700px]">
            Discover all available sustainable travel options in one place. From eco-friendly accommodations to
            low-impact activities, find everything you need for a responsible journey.
          </p>
          <Button asChild size="lg" className="bg-yovu-charcoal text-white mt-4">
            <Link href="/destination/search" className="flex items-center">
              <Globe className="mr-2 h-5 w-5" /> Browse Destinations
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
