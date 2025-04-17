import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About - Yovu",
  description: "Learn about our sustainable travel platform",
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-yovu-mint">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-12">
          <h1 className="text-4xl font-bold text-yovu-charcoal text-center mb-8">About Yovu</h1>
          <AboutSection />
          <ServicesSection />
          <TestimonialsSection />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
