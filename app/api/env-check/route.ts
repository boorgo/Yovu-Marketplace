import { NextResponse } from "next/server"

export async function GET() {
  // This route is for checking environment variables
  // Be careful not to expose sensitive information in production

  const envStatus = {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL
      ? `Set (${maskUrl(process.env.NEXT_PUBLIC_SUPABASE_URL)})`
      : "Missing",
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ? `Set (${maskKey(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)})`
      : "Missing",
    supabaseServiceRole: process.env.SUPABASE_SERVICE_ROLE_KEY
      ? `Set (${maskKey(process.env.SUPABASE_SERVICE_ROLE_KEY)})`
      : "Missing",
    nodeEnv: process.env.NODE_ENV || "Not set",
    nextPublicAppUrl: process.env.NEXT_PUBLIC_APP_URL || "Not set",
    sanityProjectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? "Set" : "Missing",
    sanityDataset: process.env.NEXT_PUBLIC_SANITY_DATASET ? "Set" : "Missing",
  }

  // Check if we're using fallback values
  const usingFallbacks =
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL === "https://your-project.supabase.co" ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "your-anon-key"

  return NextResponse.json({
    status: "Environment variables check",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    variables: envStatus,
    usingFallbacks,
    recommendations: usingFallbacks
      ? [
          "Set NEXT_PUBLIC_SUPABASE_URL to your Supabase project URL",
          "Set NEXT_PUBLIC_SUPABASE_ANON_KEY to your Supabase anon/public key",
          "These can be found in your Supabase project dashboard under Project Settings > API",
        ]
      : [],
  })
}

// Helper functions to mask sensitive information
function maskUrl(url: string): string {
  try {
    if (!url) return "Invalid URL"
    // Only show the domain part, mask the rest
    const urlObj = new URL(url)
    return urlObj.hostname
  } catch (e) {
    return "Invalid URL format"
  }
}

function maskKey(key: string): string {
  if (!key) return "Invalid key"
  // Only show first 4 and last 4 characters
  if (key.length <= 8) return "***"
  return `${key.substring(0, 4)}...${key.substring(key.length - 4)}`
}
