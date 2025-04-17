import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ExperienceBuilder } from "@/components/journey/experience-builder"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Design Your Journey - Yovu",
  description: "Create your sustainable travel journey with eco-friendly options",
}

export default function DesignJourneyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-yovu-mint">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-12">
          <ExperienceBuilder />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
