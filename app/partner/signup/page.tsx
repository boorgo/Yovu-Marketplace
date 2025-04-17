import Link from "next/link"
import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PartnerSignUpForm } from "@/components/partner-signup-form"

export const metadata: Metadata = {
  title: "Partner Sign Up - Yovu",
  description: "Join Yovu as a sustainable travel partner",
}

export default function PartnerSignUpPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-12">
          <div className="mx-auto max-w-2xl space-y-8">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Join Our Partner Network</h1>
              <p className="text-muted-foreground">
                List your sustainable business on Yovu and reach eco-conscious travelers
              </p>
            </div>
            <PartnerSignUpForm />
            <p className="text-center text-sm text-muted-foreground">
              Already a partner?{" "}
              <Link href="/partner/login" className="font-medium text-primary underline underline-offset-4">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
