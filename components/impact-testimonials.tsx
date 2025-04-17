import { Quote } from "lucide-react"

export function ImpactTestimonials() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter text-yovu-charcoal mb-4">Travelers Making a Difference</h2>
          <p className="text-yovu-charcoal/80 max-w-[800px] mx-auto text-lg">
            Hear from travelers who have used Yovu to create meaningful impact through their journeys.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="bg-yovu-mint p-8 rounded-lg relative">
            <Quote className="absolute top-4 right-4 h-8 w-8 text-yovu-charcoal/20" />
            <p className="text-yovu-charcoal/90 italic mb-6">
              "Being able to see the exact impact of my travel choices was eye-opening. I saved 230kg of carbon on my
              last trip and contributed to a local reforestation project. Yovu made it easy to travel sustainably
              without compromising on experience."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yovu-charcoal rounded-full mr-4"></div>
              <div>
                <h4 className="font-bold text-yovu-charcoal">Emma Rodriguez</h4>
                <p className="text-sm text-yovu-charcoal/70">Saved 230kg CO2 in Costa Rica</p>
              </div>
            </div>
          </div>

          <div className="bg-yovu-mint p-8 rounded-lg relative">
            <Quote className="absolute top-4 right-4 h-8 w-8 text-yovu-charcoal/20" />
            <p className="text-yovu-charcoal/90 italic mb-6">
              "I've always wanted to travel more sustainably but didn't know where to start. Yovu's platform made it
              simple to find and book eco-friendly options. The real-time impact tracking helped me make better choices
              and feel good about my trip."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yovu-charcoal rounded-full mr-4"></div>
              <div>
                <h4 className="font-bold text-yovu-charcoal">Michael Chen</h4>
                <p className="text-sm text-yovu-charcoal/70">Supported 3 local communities in Thailand</p>
              </div>
            </div>
          </div>

          <div className="bg-yovu-mint p-8 rounded-lg relative">
            <Quote className="absolute top-4 right-4 h-8 w-8 text-yovu-charcoal/20" />
            <p className="text-yovu-charcoal/90 italic mb-6">
              "As a family, we wanted to show our children how to travel responsibly. Yovu helped us create a journey
              that was not only fun but educational about sustainability. The kids loved seeing our impact scores grow
              as we added eco-friendly activities."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yovu-charcoal rounded-full mr-4"></div>
              <div>
                <h4 className="font-bold text-yovu-charcoal">Sarah Johnson</h4>
                <p className="text-sm text-yovu-charcoal/70">Family trip with 45% nature impact</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
