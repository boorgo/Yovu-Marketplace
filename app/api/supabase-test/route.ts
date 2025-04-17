import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Check if environment variables are set
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json(
      {
        status: "error",
        message: "Supabase environment variables are missing",
        details: {
          supabaseUrl: supabaseUrl ? "Set" : "Missing",
          supabaseAnonKey: supabaseAnonKey ? "Set" : "Missing",
        },
      },
      { status: 500 },
    )
  }

  try {
    // Try to initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Test connection by getting Supabase service status
    const { error } = await supabase.from("profiles").select("count", { count: "exact", head: true })

    if (error) {
      return NextResponse.json(
        {
          status: "error",
          message: "Failed to connect to Supabase",
          error: error.message,
          details: {
            code: error.code,
            hint: error.hint,
          },
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      status: "success",
      message: "Successfully connected to Supabase",
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        message: "Error testing Supabase connection",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
