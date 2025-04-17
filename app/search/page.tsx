import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SearchInterface } from "@/components/search/search-interface"
import { JourneyPlanner } from "@/components/search/journey-planner"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Search - Yovu",
  description: "Find and book sustainable travel options for your journey",
}

export default function SearchPage() {
  return (
    <div className="flex min-h-screen flex-col bg-yovu-mint">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-yovu-charcoal mb-4">Design Your Sustainable Journey</h1>
            <p className="text-yovu-charcoal/80 max-w-[800px] mx-auto">
              Search for eco-friendly accommodations, activities, dining options, and transportation to create your
              perfect sustainable travel experience.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <SearchInterface />

              <div className="mt-8 p-6 bg-white rounded-lg shadow-sm border border-yovu-mint">
                <h2 className="text-xl font-bold text-yovu-charcoal mb-4">How to Use the Journey Designer</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-yovu-mint/20 p-4 rounded-md">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-yovu-charcoal text-white flex items-center justify-center font-bold mr-2">
                        1
                      </div>
                      <h3 className="font-bold text-yovu-charcoal">Search</h3>
                    </div>
                    <p className="text-yovu-charcoal/80 text-sm">
                      Enter your destination, dates, and preferences. Use the sustainability filters to find options
                      that match your values.
                    </p>
                  </div>

                  <div className="bg-yovu-mint/20 p-4 rounded-md">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-yovu-charcoal text-white flex items-center justify-center font-bold mr-2">
                        2
                      </div>
                      <h3 className="font-bold text-yovu-charcoal">Add to Journey</h3>
                    </div>
                    <p className="text-yovu-charcoal/80 text-sm">
                      Browse the search results and add your favorite accommodations, activities, restaurants, and
                      transportation options to your journey plan.
                    </p>
                  </div>

                  <div className="bg-yovu-mint/20 p-4 rounded-md">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-yovu-charcoal text-white flex items-center justify-center font-bold mr-2">
                        3
                      </div>
                      <h3 className="font-bold text-yovu-charcoal">Book</h3>
                    </div>
                    <p className="text-yovu-charcoal/80 text-sm">
                      Review your journey plan, see your total impact metrics and sustainability score, then book your
                      entire journey with a single checkout.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <JourneyPlanner />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
