import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Get the current user
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Check if profile already exists
    const { data: existingProfile } = await supabase.from("profiles").select("id").eq("id", session.user.id).single()

    if (existingProfile) {
      return NextResponse.json({ success: true, message: "Profile already exists" })
    }

    // Create profile
    const { error } = await supabase.from("profiles").insert({
      id: session.user.id,
      full_name: session.user.user_metadata.full_name || session.user.user_metadata.name || "",
    })

    if (error) {
      console.error("Error creating profile:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error in create-profile route:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
