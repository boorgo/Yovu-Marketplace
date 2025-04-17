export function TestimonialsSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter text-yovu-charcoal mb-2">What Our Travelers Say</h2>
          <p className="text-yovu-charcoal/80 max-w-[700px] mx-auto">
            Hear from travelers who have experienced sustainable journeys with Yovu.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-yovu-mint p-6 rounded-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-yovu-charcoal rounded-full mr-4"></div>
              <div>
                <h4 className="font-bold text-yovu-charcoal">Sarah Johnson</h4>
                <p className="text-sm text-yovu-charcoal/80">Costa Rica Eco-Tour</p>
              </div>
            </div>
            <p className="text-yovu-charcoal/90 italic">
              "My experience with Yovu was incredible. They helped me find eco-friendly accommodations and activities
              that truly connected me with Costa Rica's natural beauty while ensuring my trip had minimal environmental
              impact."
            </p>
          </div>

          <div className="bg-yovu-mint p-6 rounded-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-yovu-charcoal rounded-full mr-4"></div>
              <div>
                <h4 className="font-bold text-yovu-charcoal">Michael Chen</h4>
                <p className="text-sm text-yovu-charcoal/80">Thailand Community Stay</p>
              </div>
            </div>
            <p className="text-yovu-charcoal/90 italic">
              "Staying with a local family in northern Thailand was the highlight of my trip. Yovu made it possible to
              experience authentic culture while knowing my tourism dollars were directly supporting the community."
            </p>
          </div>

          <div className="bg-yovu-mint p-6 rounded-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-yovu-charcoal rounded-full mr-4"></div>
              <div>
                <h4 className="font-bold text-yovu-charcoal">Emma Rodriguez</h4>
                <p className="text-sm text-yovu-charcoal/80">Norway Sustainable Adventure</p>
              </div>
            </div>
            <p className="text-yovu-charcoal/90 italic">
              "I was amazed at how Yovu balanced adventure with sustainability. From electric vehicle tours to
              zero-waste accommodations, every aspect of my Norway trip was thoughtfully planned to minimize
              environmental impact."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
