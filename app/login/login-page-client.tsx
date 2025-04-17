"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LoginForm } from "@/components/login-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PasswordLoginForm } from "@/components/password-login-form"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPageClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)

  // Check for error query parameter
  useEffect(() => {
    const errorParam = searchParams.get("error")
    if (errorParam === "auth") {
      setError("Authentication error. Please try logging in again.")
    }
  }, [searchParams])

  return (
    <div className="flex min-h-screen flex-col bg-yovu-mint">
      <SiteHeader />
      <main className="flex-1">
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
          <Card className="mx-auto w-full max-w-md border-yovu-mint">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-semibold tracking-tight text-yovu-charcoal">Welcome back</CardTitle>
              <CardDescription className="text-yovu-charcoal/70">Sign in to your account</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Tabs defaultValue="magic-link" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-yovu-mint">
                  <TabsTrigger
                    value="magic-link"
                    className="data-[state=active]:bg-white data-[state=active]:text-yovu-charcoal"
                  >
                    Magic Link
                  </TabsTrigger>
                  <TabsTrigger
                    value="password"
                    className="data-[state=active]:bg-white data-[state=active]:text-yovu-charcoal"
                  >
                    Password
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="magic-link">
                  <LoginForm />
                </TabsContent>
                <TabsContent value="password">
                  <PasswordLoginForm />
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center">
                <Link href="/signup" className="text-sm text-yovu-charcoal hover:underline underline-offset-4">
                  Don&apos;t have an account? Sign Up
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
