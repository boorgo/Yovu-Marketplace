"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

export function SupabaseError() {
  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-4">
      <Alert variant="destructive" className="max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Connection Error</AlertTitle>
        <AlertDescription>
          We're having trouble connecting to our authentication service. This could be due to:
          <ul className="list-disc pl-5 mt-2">
            <li>Temporary service disruption</li>
            <li>Network connectivity issues</li>
            <li>Configuration problems</li>
          </ul>
        </AlertDescription>
      </Alert>

      <div className="flex flex-col space-y-2 items-center">
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>

      <p className="text-sm text-muted-foreground max-w-md text-center">
        If this problem persists, please contact our support team for assistance.
      </p>
    </div>
  )
}
