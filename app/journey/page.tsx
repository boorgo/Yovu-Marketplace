import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { JourneyWizard } from "@/components/journey/journey-wizard"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Design Your Journey - Yovu",
  description: "Create your sustainable travel journey step by step",
}

export default function JourneyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-yovu-mint">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-12">
          <JourneyWizard />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
