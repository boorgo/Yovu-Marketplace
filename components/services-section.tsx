import { Leaf, Globe, Heart, Recycle } from "lucide-react"

export function ServicesSection() {
  return (
    <section className="w-full bg-yovu-mint py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter text-yovu-charcoal mb-2">Our Services</h2>
          <p className="text-yovu-charcoal/80 max-w-[700px] mx-auto">
            We offer a range of sustainable travel services to help you explore the world responsibly.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white p-6 rounded-md shadow-sm">
            <div className="w-12 h-12 bg-yovu-mint rounded-full flex items-center justify-center mb-4">
              <Leaf className="h-6 w-6 text-yovu-charcoal" />
            </div>
            <h3 className="text-xl font-bold text-yovu-charcoal mb-2">Eco-Friendly Accommodations</h3>
            <p className="text-yovu-charcoal/80">
              Discover accommodations that prioritize sustainability, from solar-powered eco-lodges to certified green
              hotels.
            </p>
          </div>

          <div className="bg-white p-6 rounded-md shadow-sm">
            <div className="w-12 h-12 bg-yovu-mint rounded-full flex items-center justify-center mb-4">
              <Globe className="h-6 w-6 text-yovu-charcoal" />
            </div>
            <h3 className="text-xl font-bold text-yovu-charcoal mb-2">Sustainable Activities</h3>
            <p className="text-yovu-charcoal/80">
              Explore activities and tours that respect local cultures and environments while providing authentic
              experiences.
            </p>
          </div>

          <div className="bg-white p-6 rounded-md shadow-sm">
            <div className="w-12 h-12 bg-yovu-mint rounded-full flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-yovu-charcoal" />
            </div>
            <h3 className="text-xl font-bold text-yovu-charcoal mb-2">Community Tourism</h3>
            <p className="text-yovu-charcoal/80">
              Support local communities through tourism that directly benefits residents and preserves cultural
              heritage.
            </p>
          </div>

          <div className="bg-white p-6 rounded-md shadow-sm">
            <div className="w-12 h-12 bg-yovu-mint rounded-full flex items-center justify-center mb-4">
              <Recycle className="h-6 w-6 text-yovu-charcoal" />
            </div>
            <h3 className="text-xl font-bold text-yovu-charcoal mb-2">Carbon-Neutral Transport</h3>
            <p className="text-yovu-charcoal/80">
              Choose from transportation options that minimize carbon footprint, with offsetting included for
              unavoidable emissions.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
