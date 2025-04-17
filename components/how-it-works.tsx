import { Search, PenTool, BarChart3, CreditCard } from "lucide-react"

export function HowItWorks() {
  return (
    <section className="w-full bg-yovu-mint py-16 md:py-24" id="how-it-works">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter text-yovu-charcoal mb-4">How Yovu Works</h2>
          <p className="text-yovu-charcoal/80 max-w-[800px] mx-auto text-lg">
            Our platform makes it easy to create, visualize, and book your sustainable travel journey in just a few
            simple steps.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yovu-mint rounded-full flex items-center justify-center mr-4">
                <span className="font-bold text-yovu-charcoal">1</span>
              </div>
              <Search className="h-8 w-8 text-yovu-charcoal" />
            </div>
            <h3 className="text-xl font-bold text-yovu-charcoal mb-2">Explore Options</h3>
            <p className="text-yovu-charcoal/80">
              Browse our curated marketplace of verified sustainable accommodations, activities, and transportation
              options.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yovu-mint rounded-full flex items-center justify-center mr-4">
                <span className="font-bold text-yovu-charcoal">2</span>
              </div>
              <PenTool className="h-8 w-8 text-yovu-charcoal" />
            </div>
            <h3 className="text-xl font-bold text-yovu-charcoal mb-2">Craft Your Journey</h3>
            <p className="text-yovu-charcoal/80">
              Add your favorite options to your journey planner and customize your itinerary to match your preferences.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yovu-mint rounded-full flex items-center justify-center mr-4">
                <span className="font-bold text-yovu-charcoal">3</span>
              </div>
              <BarChart3 className="h-8 w-8 text-yovu-charcoal" />
            </div>
            <h3 className="text-xl font-bold text-yovu-charcoal mb-2">Track Your Impact</h3>
            <p className="text-yovu-charcoal/80">
              Watch as our Real-Time Impact Engine calculates your journey's positive environmental and social impact.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yovu-mint rounded-full flex items-center justify-center mr-4">
                <span className="font-bold text-yovu-charcoal">4</span>
              </div>
              <CreditCard className="h-8 w-8 text-yovu-charcoal" />
            </div>
            <h3 className="text-xl font-bold text-yovu-charcoal mb-2">Book Instantly</h3>
            <p className="text-yovu-charcoal/80">
              Securely book your entire journey with a single checkout, knowing exactly how your choices benefit the
              planet.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
