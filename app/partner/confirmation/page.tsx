import Link from "next/link"
import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Application Submitted - Yovu",
  description: "Your partner application has been submitted",
}

export default function PartnerConfirmationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container flex h-[calc(100vh-4rem)] items-center justify-center">
          <div className="mx-auto max-w-md text-center">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-primary" />
            </div>
            <h1 className="mt-6 text-2xl font-bold">Application Submitted!</h1>
            <p className="mt-3 text-muted-foreground">
              Thank you for applying to join Yovu as a sustainable travel partner. Our team will review your application
              and get back to you within 2-3 business days.
            </p>
            <div className="mt-8 space-y-4">
              <p className="text-sm text-muted-foreground">
                Please check your email for a verification link to complete your account setup.
              </p>
              <Button asChild className="w-full">
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
