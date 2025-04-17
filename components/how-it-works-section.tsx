import { Search, Calendar, CreditCard, ThumbsUp } from "lucide-react"

export function HowItWorksSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">How Yovu Works</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Creating your sustainable travel journey is simple with our easy-to-use platform.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              1
            </div>
            <div className="rounded-full bg-primary/10 p-4">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Discover</h3>
            <p className="text-center text-muted-foreground">
              Browse our curated selection of sustainable accommodations, activities, and transportation options.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              2
            </div>
            <div className="rounded-full bg-primary/10 p-4">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Plan</h3>
            <p className="text-center text-muted-foreground">
              Add experiences to your journey planner and customize your itinerary to match your preferences.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              3
            </div>
            <div className="rounded-full bg-primary/10 p-4">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Book</h3>
            <p className="text-center text-muted-foreground">
              Securely book your entire journey with a single checkout, seeing your environmental impact in real-time.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              4
            </div>
            <div className="rounded-full bg-primary/10 p-4">
              <ThumbsUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Enjoy</h3>
            <p className="text-center text-muted-foreground">
              Travel with peace of mind knowing your journey supports sustainability and local communities.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
