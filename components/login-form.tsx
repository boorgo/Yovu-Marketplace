"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Info } from "lucide-react"
import { SupabaseConfigError } from "@/components/supabase-config-error"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [rateLimitError, setRateLimitError] = React.useState<boolean>(false)
  const [lastAttemptTime, setLastAttemptTime] = React.useState<number | null>(null)
  const [configError, setConfigError] = React.useState<boolean>(false)
  const [connectionError, setConnectionError] = React.useState<boolean>(false)

  // Check if Supabase is properly configured
  React.useEffect(() => {
    try {
      // Simple check to see if Supabase URL is properly configured
      if (
        !process.env.NEXT_PUBLIC_SUPABASE_URL ||
        process.env.NEXT_PUBLIC_SUPABASE_URL === "https://your-project.supabase.co"
      ) {
        setConfigError(true)
      }
    } catch (error) {
      console.error("Error checking Supabase configuration:", error)
      setConfigError(true)
    }
  }, [])

  // Check if there's a stored timestamp for the last login attempt
  React.useEffect(() => {
    const storedTime = localStorage.getItem("lastLoginAttempt")
    if (storedTime) {
      setLastAttemptTime(Number.parseInt(storedTime, 10))
    }
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (configError) {
      toast({
        title: "Configuration Error",
        description: "Supabase is not properly configured. Please check your environment variables.",
        variant: "destructive",
      })
      return
    }

    // Check if we're within the cooldown period (5 minutes)
    const now = Date.now()
    if (lastAttemptTime && now - lastAttemptTime < 5 * 60 * 1000) {
      const remainingSeconds = Math.ceil((5 * 60 * 1000 - (now - lastAttemptTime)) / 1000)
      const minutes = Math.floor(remainingSeconds / 60)
      const seconds = remainingSeconds % 60

      toast({
        title: "Please wait before trying again",
        description: `You can request another login link in ${minutes}m ${seconds}s`,
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setRateLimitError(false)
    setConnectionError(false)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: values.email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      })

      if (error) {
        console.error("Login error:", error)

        // Check specifically for rate limit errors
        if (error.message.includes("rate limit") || error.message.toLowerCase().includes("too many requests")) {
          setRateLimitError(true)
          // Store the timestamp of this attempt
          localStorage.setItem("lastLoginAttempt", now.toString())
          setLastAttemptTime(now)
          throw new Error("Too many login attempts. Please try again later.")
        }

        // Check if it's a connection error
        if (error.message.includes("fetch") || error.message.includes("network")) {
          setConnectionError(true)
          throw new Error(
            "Unable to connect to authentication service. Please check your internet connection and try again.",
          )
        }

        throw error
      }

      // Store the timestamp of this successful attempt
      localStorage.setItem("lastLoginAttempt", now.toString())
      setLastAttemptTime(now)

      toast({
        title: "Magic link sent",
        description: "Check your email for the login link",
      })
    } catch (error: any) {
      console.error("Error details:", error)
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Calculate cooldown time remaining if applicable
  const getCooldownRemaining = () => {
    if (!lastAttemptTime) return null

    const now = Date.now()
    const elapsed = now - lastAttemptTime
    const cooldownPeriod = 5 * 60 * 1000 // 5 minutes in milliseconds

    if (elapsed >= cooldownPeriod) return null

    const remaining = cooldownPeriod - elapsed
    const minutes = Math.floor(remaining / 60000)
    const seconds = Math.floor((remaining % 60000) / 1000)

    return `${minutes}m ${seconds}s`
  }

  const cooldownRemaining = getCooldownRemaining()

  // If there's a configuration error, show the config error component
  if (configError) {
    return <SupabaseConfigError />
  }

  return (
    <>
      {connectionError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Connection Error</AlertTitle>
          <AlertDescription>
            Unable to connect to authentication service. Please check your internet connection and try again.
          </AlertDescription>
        </Alert>
      )}

      {rateLimitError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Rate limit exceeded</AlertTitle>
          <AlertDescription>You've made too many login attempts. Please wait before trying again.</AlertDescription>
        </Alert>
      )}

      {cooldownRemaining && (
        <Alert className="mb-4 bg-yovu-mint border-yovu-charcoal/20">
          <Info className="h-4 w-4 text-yovu-charcoal" />
          <AlertTitle className="text-yovu-charcoal">Cooldown period</AlertTitle>
          <AlertDescription className="text-yovu-charcoal/70">
            Please wait {cooldownRemaining} before requesting another login link.
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-yovu-charcoal">Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" {...field} autoComplete="email" />
                </FormControl>
                <FormDescription className="text-yovu-charcoal/70">
                  We&apos;ll send you a magic link to sign in.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-yovu-charcoal text-white hover:bg-yovu-charcoal/90"
            disabled={isLoading || !!cooldownRemaining}
          >
            {isLoading ? "Sending magic link..." : "Sign In with Email"}
          </Button>
        </form>
      </Form>

      <div className="mt-4 text-sm text-yovu-charcoal/70">
        <p>
          Note: For security reasons, we limit how often login links can be sent to the same email address. If you don't
          receive an email, please check your spam folder before trying again.
        </p>
      </div>
    </>
  )
}
