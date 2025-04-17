import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Building, Users, TrendingUp, Award } from "lucide-react"

export function PartnerSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex items-center justify-center">
            <div className="relative h-[450px] w-full overflow-hidden rounded-xl bg-muted">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-muted-foreground/20">
                <img
                  src="/placeholder.svg?height=450&width=600"
                  alt="Sustainable business partner"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                Partners
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Join Our Sustainable Partner Network
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                List your eco-friendly accommodations, activities, or transportation services on our platform and reach
                conscious travelers.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-start space-x-3">
                <Building className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-bold">Increased Visibility</h3>
                  <p className="text-sm text-muted-foreground">
                    Reach eco-conscious travelers looking for sustainable options
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Users className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-bold">Community Access</h3>
                  <p className="text-sm text-muted-foreground">Join a network of like-minded sustainable businesses</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <TrendingUp className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-bold">Growth Opportunities</h3>
                  <p className="text-sm text-muted-foreground">Expand your customer base and increase bookings</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Award className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-bold">Sustainability Recognition</h3>
                  <p className="text-sm text-muted-foreground">Showcase your eco-credentials to a global audience</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/partner/signup">Become a Partner</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/partner/learn-more">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
