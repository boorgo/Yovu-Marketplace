import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="w-full bg-yovu-mint py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-block bg-white px-3 py-1 rounded-full text-sm font-medium text-yovu-charcoal">
            Sustainable Travel Marketplace
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-yovu-charcoal">
            Craft Your Impact-Driven Journey
          </h1>
          <p className="text-yovu-charcoal/90 max-w-[800px] text-lg md:text-xl">
            Design and book verified sustainable travel experiences while tracking your positive impact in real-time.
            Carbon savings, nature restoration, and community support—all at your fingertips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button asChild size="lg" className="bg-yovu-charcoal text-white text-base">
              <Link href="/signup">Start Your Journey</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-yovu-charcoal text-yovu-charcoal text-base">
              <Link href="#how-it-works">
                How It Works <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
