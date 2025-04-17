import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DestinationSearchForm } from "@/components/destination/destination-search-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Search Destinations - Yovu",
  description: "Find sustainable travel options for your next journey",
}

export default function DestinationSearchPage() {
  return (
    <div className="flex min-h-screen flex-col bg-yovu-mint">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-12">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-3xl font-bold text-yovu-charcoal mb-4">Discover Your Sustainable Destination</h1>
            <p className="text-yovu-charcoal/80">
              Search for a destination to explore all sustainable travel options including accommodations, activities,
              dining, and transportation.
            </p>
          </div>

          <DestinationSearchForm />

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <DestinationCard
              name="Costa Rica"
              image="/placeholder.svg?height=300&width=400"
              sustainabilityScore={92}
              description="Explore rainforests, beaches, and wildlife in one of the world's most sustainable destinations."
            />
            <DestinationCard
              name="Norway"
              image="/placeholder.svg?height=300&width=400"
              sustainabilityScore={90}
              description="Discover fjords, mountains, and the northern lights in this eco-friendly Scandinavian country."
            />
            <DestinationCard
              name="New Zealand"
              image="/placeholder.svg?height=300&width=400"
              sustainabilityScore={88}
              description="Experience breathtaking landscapes and Maori culture in a country committed to conservation."
            />
            <DestinationCard
              name="Slovenia"
              image="/placeholder.svg?height=300&width=400"
              sustainabilityScore={87}
              description="Explore alpine lakes, caves, and forests in Europe's green gem."
            />
            <DestinationCard
              name="Palau"
              image="/placeholder.svg?height=300&width=400"
              sustainabilityScore={89}
              description="Dive into crystal clear waters in this island nation known for marine conservation."
            />
            <DestinationCard
              name="Bhutan"
              image="/placeholder.svg?height=300&width=400"
              sustainabilityScore={91}
              description="Visit the world's only carbon-negative country with stunning Himalayan landscapes."
            />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

function DestinationCard({
  name,
  image,
  sustainabilityScore,
  description,
}: {
  name: string
  image: string
  sustainabilityScore: number
  description: string
}) {
  return (
    <a
      href={`/destination/${name.toLowerCase().replace(/\s+/g, "-")}`}
      className="group overflow-hidden rounded-lg border border-yovu-mint bg-white shadow-sm transition-all hover:shadow-md"
    >
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-yovu-charcoal">{name}</h3>
          <div className="bg-yovu-mint/30 text-yovu-charcoal px-2 py-1 rounded-full text-sm font-medium">
            {sustainabilityScore}/100
          </div>
        </div>
        <p className="text-yovu-charcoal/80 text-sm">{description}</p>
      </div>
    </a>
  )
}
