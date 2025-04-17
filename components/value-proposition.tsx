import { Leaf, BarChart, Globe, Users } from "lucide-react"

export function ValueProposition() {
  return (
    <section className="w-full bg-white py-16 md:py-24" id="value-proposition">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter text-yovu-charcoal mb-4">
            Why Choose Yovu for Your Sustainable Travel
          </h2>
          <p className="text-yovu-charcoal/80 max-w-[800px] mx-auto text-lg">
            Yovu is the first travel marketplace that empowers you to make informed choices based on real environmental
            and social impact data.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-yovu-mint p-6 rounded-lg">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
              <Leaf className="h-6 w-6 text-yovu-charcoal" />
            </div>
            <h3 className="text-xl font-bold text-yovu-charcoal mb-2">Verified Sustainability</h3>
            <p className="text-yovu-charcoal/80">
              All travel options are thoroughly vetted and verified for their sustainability practices and claims.
            </p>
          </div>

          <div className="bg-yovu-mint p-6 rounded-lg">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
              <BarChart className="h-6 w-6 text-yovu-charcoal" />
            </div>
            <h3 className="text-xl font-bold text-yovu-charcoal mb-2">Real-Time Impact Engine</h3>
            <p className="text-yovu-charcoal/80">
              Watch your positive impact grow in real-time as you craft your journey with our innovative tracking
              technology.
            </p>
          </div>

          <div className="bg-yovu-mint p-6 rounded-lg">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
              <Globe className="h-6 w-6 text-yovu-charcoal" />
            </div>
            <h3 className="text-xl font-bold text-yovu-charcoal mb-2">Personalized Journeys</h3>
            <p className="text-yovu-charcoal/80">
              Design your own unique travel experience by mixing and matching sustainable options that match your
              preferences.
            </p>
          </div>

          <div className="bg-yovu-mint p-6 rounded-lg">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-yovu-charcoal" />
            </div>
            <h3 className="text-xl font-bold text-yovu-charcoal mb-2">Community Impact</h3>
            <p className="text-yovu-charcoal/80">
              Support local communities directly through your travel choices and see exactly how your money makes a
              difference.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
