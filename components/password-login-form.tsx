"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { SupabaseConfigError } from "@/components/supabase-config-error"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})

export function PasswordLoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
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

    setIsLoading(true)
    setConnectionError(false)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      })

      if (error) {
        console.error("Login error:", error)

        // Check if it's a connection error
        if (error.message.includes("fetch") || error.message.includes("network")) {
          setConnectionError(true)
          throw new Error(
            "Unable to connect to authentication service. Please check your internet connection and try again.",
          )
        }

        throw error
      }

      toast({
        title: "Login successful",
        description: "You have been logged in successfully.",
      })

      router.push("/dashboard")
      router.refresh()
    } catch (error: any) {
      console.error("Error details:", error)
      toast({
        title: "Error",
        description: error.message || "Invalid email or password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-yovu-charcoal">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name@example.com"
                    {...field}
                    autoComplete="email"
                    className="bg-white border-yovu-mint"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-yovu-charcoal">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    {...field}
                    autoComplete="current-password"
                    className="bg-white border-yovu-mint"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-yovu-charcoal text-white hover:bg-yovu-charcoal/90"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In with Password"}
          </Button>
        </form>
      </Form>
    </>
  )
}
