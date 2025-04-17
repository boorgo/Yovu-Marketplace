import { Leaf, Globe, Heart, Recycle } from "lucide-react"

export function FeaturesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Why Choose Yovu for Your Sustainable Travel
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform makes it easy to create eco-friendly travel experiences that benefit both you and the planet.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
            <div className="rounded-full bg-primary/10 p-4">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Eco-Certified</h3>
            <p className="text-center text-muted-foreground">
              All our partners meet strict sustainability criteria and certifications.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
            <div className="rounded-full bg-primary/10 p-4">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Carbon Tracking</h3>
            <p className="text-center text-muted-foreground">
              See the environmental impact of your travel choices in real-time.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
            <div className="rounded-full bg-primary/10 p-4">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Community Support</h3>
            <p className="text-center text-muted-foreground">
              Your bookings directly support local communities and conservation efforts.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
            <div className="rounded-full bg-primary/10 p-4">
              <Recycle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Flexible Planning</h3>
            <p className="text-center text-muted-foreground">
              Design your own journey with our customizable sustainable travel planner.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
