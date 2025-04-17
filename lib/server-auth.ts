import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { cache } from "react"
import { hasSupabaseConfig } from "./supabase"

// Use React's cache function to ensure we only create one client per request
export const createServerSupabaseClient = cache(() => {
  // Check if environment variables are available
  if (!hasSupabaseConfig()) {
    throw new Error("Supabase environment variables are missing in server component")
  }

  const cookieStore = cookies()
  return createServerComponentClient({ cookies: () => cookieStore })
})

export async function getSession() {
  try {
    // Check if environment variables are available
    if (!hasSupabaseConfig()) {
      console.warn("Supabase environment variables are missing in getSession")
      return null
    }

    const supabase = createServerSupabaseClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session
  } catch (error) {
    console.error("Error getting session:", error)
    return null
  }
}

export async function requireAuth() {
  try {
    // Check if environment variables are available
    if (!hasSupabaseConfig()) {
      redirect("/config-error")
    }

    const session = await getSession()
    if (!session) {
      redirect("/login")
    }
    return session
  } catch (error) {
    console.error("Error in requireAuth:", error)
    // Handle the error more gracefully
    redirect("/login?error=auth")
  }
}

export async function getUserProfile() {
  try {
    // Check if environment variables are available
    if (!hasSupabaseConfig()) {
      return null
    }

    const session = await getSession()
    if (!session) return null

    const supabase = createServerSupabaseClient()

    // First check if profile exists
    const { data, error } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

    if (error) {
      console.error("Error fetching user profile:", error)

      // If profile doesn't exist, create it with basic info
      if (error.code === "PGRST116") {
        // Record not found
        const { data: newProfile, error: createError } = await supabase
          .from("profiles")
          .insert({
            id: session.user.id,
            full_name: session.user.user_metadata.full_name || session.user.user_metadata.name || "",
          })
          .select("*")
          .single()

        if (createError) {
          console.error("Error creating user profile:", createError)
          return null
        }

        return newProfile
      }

      return null
    }

    return data
  } catch (error) {
    console.error("Error in getUserProfile:", error)
    return null
  }
}
