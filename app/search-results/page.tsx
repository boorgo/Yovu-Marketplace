import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SearchInterface } from "@/components/search/search-interface"
import { SearchResults } from "@/components/search/search-results"
import { JourneyPlanner } from "@/components/search/journey-planner"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Search Results - Yovu",
  description: "Find and book sustainable travel options for your journey",
}

export default function SearchResultsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-yovu-mint">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-8">
          <h1 className="text-3xl font-bold text-yovu-charcoal mb-6">Design Your Sustainable Journey</h1>

          <div className="mb-8">
            <SearchInterface />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <SearchResults />
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
