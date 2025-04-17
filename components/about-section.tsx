import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AboutSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter text-yovu-charcoal mb-4">About Yovu</h2>
            <p className="text-yovu-charcoal/80 mb-6">
              Yovu is a sustainable travel platform dedicated to helping eco-conscious travelers make responsible
              choices. We believe that travel should be a force for good, connecting people with nature and local
              communities while minimizing environmental impact.
            </p>
            <p className="text-yovu-charcoal/80 mb-6">
              Our mission is to make sustainable travel accessible, enjoyable, and impactful. We carefully vet all our
              partners to ensure they meet our strict sustainability criteria, from carbon footprint reduction to
              supporting local communities.
            </p>
            <Button asChild className="bg-yovu-charcoal text-white">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
          <div className="relative h-[400px] overflow-hidden rounded-md">
            <div className="absolute inset-0 bg-yovu-mint/50">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Sustainable travel experience"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
