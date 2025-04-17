import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function DebugPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Yovu Debug Page</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Environment Variables</CardTitle>
            <CardDescription>Check if environment variables are properly configured</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              This will check if all required environment variables are set correctly.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/api/env-check">Check Environment Variables</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Supabase Connection</CardTitle>
            <CardDescription>Test connection to Supabase</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              This will attempt to connect to Supabase and verify authentication is working.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/api/supabase-test">Test Supabase Connection</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Common Issues</h2>

        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">Missing Supabase Environment Variables</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Make sure you've set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">Connection Errors</h3>
            <p className="text-sm text-muted-foreground mt-1">
              If you're seeing "Failed to fetch" errors, check that your Supabase URL is correct and accessible.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">Authentication Issues</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Make sure your Supabase project has the correct authentication settings enabled.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Button asChild variant="outline">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  )
}
