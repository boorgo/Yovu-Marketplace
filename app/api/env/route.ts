import { NextResponse } from "next/server"

export async function GET() {
  // This route is just for debugging environment variables
  // Do not expose sensitive information in production

  const envStatus = {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? "Set" : "Missing",
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Set" : "Missing",
    supabaseServiceRole: process.env.SUPABASE_SERVICE_ROLE_KEY ? "Set" : "Missing",
    sanityProjectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? "Set" : "Missing",
    sanityDataset: process.env.NEXT_PUBLIC_SANITY_DATASET ? "Set" : "Missing",
  }

  return NextResponse.json(envStatus)
}
