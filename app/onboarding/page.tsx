import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { OnboardingForm } from "@/components/onboarding-form"
import { createServerSupabaseClient, getSession } from "@/lib/server-auth"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Complete Your Profile - Yovu",
  description: "Set up your sustainable travel preferences",
}

export default async function OnboardingPage() {
  // Check if the user is authenticated
  const session = await getSession()

  if (!session) {
    // If not authenticated, redirect to login
    redirect("/login?redirectTo=/onboarding")
  }

  try {
    // Check if the user already has a profile
    const supabase = createServerSupabaseClient()
    const { data: existingProfile, error } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", session.user.id)
      .single()

    // If there's an error other than "not found", log it
    if (error && error.code !== "PGRST116") {
      console.error("Error checking profile:", error)
    }

    // If no profile exists, create one with basic info from auth metadata
    if (!existingProfile && error?.code === "PGRST116") {
      const { error: insertError } = await supabase.from("profiles").insert({
        id: session.user.id,
        full_name: session.user.user_metadata.full_name || session.user.user_metadata.name || "",
      })

      if (insertError) {
        console.error("Error creating profile:", insertError)
      }
    }
  } catch (error) {
    console.error("Error in onboarding page:", error)
    // We'll continue even if there's an error, as the form will handle it
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-12">
          <div className="mx-auto max-w-2xl space-y-8">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Complete Your Profile</h1>
              <p className="text-muted-foreground">
                Tell us about your travel preferences so we can personalize your sustainable journey
              </p>
            </div>
            <OnboardingForm />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
