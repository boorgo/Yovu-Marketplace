import Link from "next/link"
import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "Verify Your Email - Yovu",
  description: "Please verify your email to complete signup",
}

export default function SignupConfirmationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container flex h-[calc(100vh-4rem)] items-center justify-center">
          <div className="mx-auto max-w-md text-center">
            <div className="flex justify-center">
              <Mail className="h-16 w-16 text-primary" />
            </div>
            <h1 className="mt-6 text-2xl font-bold">Check Your Email</h1>
            <p className="mt-3 text-muted-foreground">
              We've sent a verification link to your email address. Please check your inbox and click the link to
              complete your registration.
            </p>
            <div className="mt-8 space-y-4">
              <p className="text-sm text-muted-foreground">
                After verifying your email, you'll be redirected to complete your profile setup.
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
