import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function SearchLink() {
  return (
    <section className="w-full bg-yovu-mint py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-yovu-charcoal">
            Ready to Design Your Sustainable Journey?
          </h2>
          <p className="text-yovu-charcoal/90 max-w-[700px]">
            Use our unique Journey Designer to build your personalized travel plan with verified eco-friendly options.
            Track your impact in real-time as you craft your perfect trip.
          </p>
          <Button asChild size="lg" className="bg-yovu-charcoal text-white mt-4">
            <Link href="/search" className="flex items-center">
              <Search className="mr-2 h-5 w-5" /> Start Searching
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
