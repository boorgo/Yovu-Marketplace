import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, TrendingUp, Sprout, Heart } from "lucide-react"

export function ImpactEngine() {
  return (
    <section className="w-full bg-white py-16 md:py-24" id="impact-engine">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <div className="inline-block bg-yovu-mint px-3 py-1 rounded-full text-sm font-medium text-yovu-charcoal mb-4">
              Real-Time Impact Engine
            </div>
            <h2 className="text-3xl font-bold tracking-tighter text-yovu-charcoal mb-4">
              See Your Positive Impact in Real-Time
            </h2>
            <p className="text-yovu-charcoal/80 mb-6 text-lg">
              Our innovative Real-Time Impact Engine calculates and displays clear sustainability scores as you build
              your journey, helping you make informed choices that align with your values.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="mt-1 mr-4 bg-yovu-mint p-2 rounded-full">
                  <TrendingUp className="h-5 w-5 text-yovu-charcoal" />
                </div>
                <div>
                  <h3 className="font-bold text-yovu-charcoal">Carbon Savings</h3>
                  <p className="text-yovu-charcoal/80">
                    Track exactly how much carbon your travel choices save compared to conventional options.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mt-1 mr-4 bg-yovu-mint p-2 rounded-full">
                  <Sprout className="h-5 w-5 text-yovu-charcoal" />
                </div>
                <div>
                  <h3 className="font-bold text-yovu-charcoal">Nature Restoration</h3>
                  <p className="text-yovu-charcoal/80">
                    See how your journey contributes to biodiversity protection and ecosystem restoration.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mt-1 mr-4 bg-yovu-mint p-2 rounded-full">
                  <Heart className="h-5 w-5 text-yovu-charcoal" />
                </div>
                <div>
                  <h3 className="font-bold text-yovu-charcoal">Community Support</h3>
                  <p className="text-yovu-charcoal/80">
                    Understand how your travel dollars directly benefit local communities and support fair wages.
                  </p>
                </div>
              </div>
            </div>

            <Button asChild className="bg-yovu-charcoal text-white">
              <Link href="/impact">
                Learn More About Our Impact Metrics <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-yovu-mint/30 to-yovu-mint/10">
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="Real-Time Impact Dashboard"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-white p-4 bg-opacity-90">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-sm text-yovu-charcoal/70">Carbon Saved</div>
                  <div className="text-xl font-bold text-yovu-charcoal">127 kg</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-yovu-charcoal/70">Nature Impact</div>
                  <div className="text-xl font-bold text-yovu-charcoal">+42%</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-yovu-charcoal/70">Community</div>
                  <div className="text-xl font-bold text-yovu-charcoal">$340</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
