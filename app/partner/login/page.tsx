import Link from "next/link"
import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PartnerLoginForm } from "@/components/partner-login-form"

export const metadata: Metadata = {
  title: "Partner Login - Yovu",
  description: "Login to your Yovu partner account",
}

export default function PartnerLoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Partner Login</h1>
              <p className="text-sm text-muted-foreground">Enter your email to sign in to your partner account</p>
            </div>
            <PartnerLoginForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              <Link href="/partner/signup" className="hover:text-brand underline underline-offset-4">
                Don&apos;t have a partner account? Apply now
              </Link>
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
