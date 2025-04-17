import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/hero-section"
import { ValueProposition } from "@/components/value-proposition"
import { HowItWorks } from "@/components/how-it-works"
import { ImpactEngine } from "@/components/impact-engine"
import { TravelOptions } from "@/components/travel-options"
import { ImpactTestimonials } from "@/components/impact-testimonials"
import { CTASection } from "@/components/cta-section"
import { JourneyLink } from "@/components/journey-link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-yovu-mint">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <ValueProposition />
        <HowItWorks />
        <JourneyLink />
        <ImpactEngine />
        <TravelOptions />
        <ImpactTestimonials />
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  )
}
