import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardWelcome } from "@/components/dashboard/dashboard-welcome"
import { JourneyPlanner } from "@/components/dashboard/journey-planner"
import { RecommendedExperiences } from "@/components/dashboard/recommended-experiences"
import { getSession } from "@/lib/server-auth"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Dashboard - Yovu",
  description: "Manage your sustainable travel journeys",
}

export default async function DashboardPage() {
  // Check if the user is authenticated
  const session = await getSession()

  if (!session) {
    // If not authenticated, redirect to login
    redirect("/login?redirectTo=/dashboard")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Plan and manage your sustainable travel journeys." />
      <div className="grid gap-8">
        <DashboardWelcome />
        <JourneyPlanner />
        <RecommendedExperiences />
      </div>
    </DashboardShell>
  )
}
