import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Check if Supabase environment variables are available
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn("Supabase environment variables are missing in middleware")

    // If accessing protected routes without env vars, redirect to a config error page
    if (
      req.nextUrl.pathname.startsWith("/dashboard") ||
      req.nextUrl.pathname.startsWith("/onboarding") ||
      req.nextUrl.pathname.startsWith("/partner/dashboard")
    ) {
      return NextResponse.redirect(new URL("/config-error", req.url))
    }

    // For other routes, just continue
    return res
  }

  try {
    // Create a new Supabase client for each request in middleware
    const supabase = createMiddlewareClient({ req, res })

    // Check if the user is authenticated
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Authentication check for protected routes
    if (req.nextUrl.pathname.startsWith("/dashboard") || req.nextUrl.pathname.startsWith("/onboarding")) {
      if (!session) {
        const redirectUrl = new URL("/login", req.url)
        // Add the original URL as a query parameter to redirect back after login
        redirectUrl.searchParams.set("redirectTo", req.nextUrl.pathname)
        return NextResponse.redirect(redirectUrl)
      }

      // If user is authenticated and trying to access dashboard,
      // check if they have a profile
      if (req.nextUrl.pathname.startsWith("/dashboard")) {
        try {
          // Check if user has a profile
          const { data: profile, error } = await supabase
            .from("profiles")
            .select("id")
            .eq("id", session.user.id)
            .single()

          // If no profile exists, redirect to onboarding
          if (error && error.code === "PGRST116") {
            // Record not found
            return NextResponse.redirect(new URL("/onboarding", req.url))
          }
        } catch (error) {
          console.error("Error checking profile in middleware:", error)
          // If there's an error, we'll still allow access to the dashboard
          // The dashboard page can handle the error more gracefully
        }
      }
    }

    // Partner routes protection
    if (req.nextUrl.pathname.startsWith("/partner/dashboard")) {
      if (!session) {
        return NextResponse.redirect(new URL("/partner/login", req.url))
      }

      // Check if user is a partner
      const { data: userData } = await supabase.auth.getUser()
      if (userData?.user?.user_metadata?.role !== "partner") {
        return NextResponse.redirect(new URL("/", req.url))
      }
    }

    // Redirect logged in users from auth pages
    if (session && (req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/signup"))) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    return res
  } catch (error) {
    console.error("Error in middleware:", error)

    // If there's an error in protected routes, redirect to config error page
    if (
      req.nextUrl.pathname.startsWith("/dashboard") ||
      req.nextUrl.pathname.startsWith("/onboarding") ||
      req.nextUrl.pathname.startsWith("/partner/dashboard")
    ) {
      return NextResponse.redirect(new URL("/config-error", req.url))
    }

    // For other routes, just continue
    return res
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/onboarding/:path*",
    "/partner/dashboard/:path*",
    "/login",
    "/signup",
    "/partner/login",
  ],
}
