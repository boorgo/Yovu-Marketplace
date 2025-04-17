import { createClient } from "@supabase/supabase-js"
import type { SupabaseClient } from "@supabase/supabase-js"

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Global variable to store the Supabase client instance
let supabaseInstance: SupabaseClient | null = null

// Function to check if environment variables are available
export function hasSupabaseConfig(): boolean {
  return !!supabaseUrl && !!supabaseAnonKey
}

// Function to get the Supabase client (singleton pattern)
export function getSupabase(): SupabaseClient {
  if (!hasSupabaseConfig()) {
    throw new Error("Supabase environment variables are missing")
  }

  if (supabaseInstance) {
    return supabaseInstance
  }

  supabaseInstance = createClient(supabaseUrl!, supabaseAnonKey!, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  })

  return supabaseInstance
}

// Create a mock client that shows friendly errors
function createMockClient(): SupabaseClient {
  const mockHandler = {
    get: () => {
      return new Proxy(
        {},
        {
          get: () => {
            return () => {
              throw new Error("Supabase client not initialized: environment variables are missing")
            }
          },
        },
      )
    },
    apply: () => {
      throw new Error("Supabase client not initialized: environment variables are missing")
    },
  }

  return new Proxy({} as SupabaseClient, mockHandler)
}

// Export a singleton instance for backward compatibility
export const supabase = (() => {
  try {
    if (!hasSupabaseConfig()) {
      console.warn("Supabase environment variables are missing, using mock client")
      return createMockClient()
    }

    // In server components, we need to create a new instance each time
    // but in client components, we want to reuse the same instance
    if (typeof window === "undefined") {
      // Server-side: Create a new instance each time
      return createClient(supabaseUrl!, supabaseAnonKey!, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      })
    } else {
      // Client-side: Use the singleton pattern
      return getSupabase()
    }
  } catch (error) {
    console.error("Error initializing default Supabase client:", error)
    return createMockClient()
  }
})()
