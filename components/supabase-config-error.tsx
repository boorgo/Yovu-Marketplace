"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Settings } from "lucide-react"
import Link from "next/link"

export function SupabaseConfigError() {
  return (
    <Card className="max-w-md mx-auto bg-white border-yovu-mint">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-destructive" />
          <CardTitle className="text-yovu-charcoal">Configuration Required</CardTitle>
        </div>
        <CardDescription className="text-yovu-charcoal/70">
          Supabase connection settings are missing or incorrect
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Connection Error</AlertTitle>
          <AlertDescription>
            Unable to connect to Supabase. This is likely due to missing environment variables.
          </AlertDescription>
        </Alert>

        <div className="space-y-4 text-sm">
          <p className="text-yovu-charcoal">
            To fix this issue, you need to set up your Supabase environment variables:
          </p>

          <div className="bg-yovu-mint p-3 rounded-md font-mono text-xs">
            <p>NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co</p>
            <p>NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key</p>
          </div>

          <p className="text-yovu-charcoal/70">
            These values can be found in your Supabase project settings under API settings.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
          className="border-yovu-charcoal bg-transparent text-yovu-charcoal"
        >
          Try Again
        </Button>
        <Button asChild className="bg-yovu-charcoal text-white">
          <Link href="/">Return Home</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
