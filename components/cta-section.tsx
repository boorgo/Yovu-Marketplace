import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="w-full bg-yovu-charcoal py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter text-white mb-2">
            Ready to Make Your Travel a Force for Good?
          </h2>
          <p className="text-white/80 max-w-[800px] text-lg">
            Join Yovu today and start crafting your impact-driven journey. Every trip you take can help protect our
            planet and support local communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button asChild size="lg" className="bg-yovu-mint text-yovu-charcoal text-base">
              <Link href="/signup">Create Your Account</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white text-base">
              <Link href="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
