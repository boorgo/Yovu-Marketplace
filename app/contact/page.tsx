import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContactSection } from "@/components/contact-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact - Yovu",
  description: "Get in touch with our sustainable travel experts",
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-yovu-mint">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-12">
          <h1 className="text-4xl font-bold text-yovu-charcoal text-center mb-8">Contact Us</h1>
          <ContactSection />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
