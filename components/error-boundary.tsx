"use client"

import React from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Leaf } from "lucide-react"
import Link from "next/link"

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // Check if it's a Supabase configuration error
      if (
        this.state.error?.message.includes("Supabase") &&
        this.state.error?.message.includes("environment variables")
      ) {
        return (
          <div className="flex min-h-screen items-center justify-center bg-yovu-mint p-4">
            <Card className="max-w-md mx-auto bg-white border-yovu-mint">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-yovu-charcoal" />
                  <CardTitle className="text-yovu-charcoal">Configuration Required</CardTitle>
                </div>
                <CardDescription className="text-yovu-charcoal/70">
                  Supabase connection settings are missing or incorrect
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert variant="destructive" className="mb-6">
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

                  <div className="bg-yovu-mint p-4 rounded-xl font-mono text-xs">
                    <p className="mb-2">NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co</p>
                    <p>NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key</p>
                  </div>

                  <p className="text-yovu-charcoal/70">
                    These values can be found in your Supabase project settings under API settings.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t py-4">
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
          </div>
        )
      }

      // You can render any custom fallback UI for other errors
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center p-8 space-y-4 bg-yovu-mint">
            <Card className="max-w-md w-full bg-white border-yovu-mint">
              <CardHeader>
                <CardTitle className="text-yovu-charcoal">Something went wrong</CardTitle>
                <CardDescription className="text-yovu-charcoal/70">We encountered an unexpected error</CardDescription>
              </CardHeader>
              <CardContent>
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{this.state.error?.message || "An unexpected error occurred"}</AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter>
                <Button onClick={() => window.location.reload()} className="w-full bg-yovu-charcoal text-white">
                  Try Again
                </Button>
              </CardFooter>
            </Card>
          </div>
        )
      )
    }

    return this.props.children
  }
}
