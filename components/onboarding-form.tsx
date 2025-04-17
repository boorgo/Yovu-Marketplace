"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { supabase } from "@/lib/supabase"

const sustainabilityPreferences = [
  {
    id: "carbon-offset",
    label: "Carbon Offset Programs",
  },
  {
    id: "eco-certified",
    label: "Eco-Certified Accommodations",
  },
  {
    id: "local-community",
    label: "Local Community Support",
  },
  {
    id: "plastic-free",
    label: "Plastic-Free Options",
  },
  {
    id: "renewable-energy",
    label: "Renewable Energy Use",
  },
  {
    id: "wildlife-conservation",
    label: "Wildlife Conservation",
  },
] as const

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  travelFrequency: z.string({
    required_error: "Please select your travel frequency.",
  }),
  travelStyle: z.string({
    required_error: "Please select your travel style.",
  }),
  sustainabilityPreferences: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You must select at least one sustainability preference.",
  }),
  bio: z
    .string()
    .max(500, {
      message: "Bio must not exceed 500 characters.",
    })
    .optional(),
  newsletterOptIn: z.boolean().default(false),
})

export function OnboardingForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [initialLoading, setInitialLoading] = React.useState(true)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      location: "",
      bio: "",
      sustainabilityPreferences: [],
      newsletterOptIn: false,
    },
  })

  // Load existing profile data if available
  React.useEffect(() => {
    async function loadProfile() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (user) {
          // Get existing profile data
          const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

          if (data && !error) {
            // Pre-fill the form with existing data
            form.reset({
              fullName: data.full_name || "",
              location: data.location || "",
              travelFrequency: data.travel_frequency || undefined,
              travelStyle: data.travel_style || undefined,
              sustainabilityPreferences: data.sustainability_preferences || [],
              bio: data.bio || "",
              newsletterOptIn: data.newsletter_opt_in || false,
            })
          }
        }
      } catch (error) {
        console.error("Error loading profile:", error)
      } finally {
        setInitialLoading(false)
      }
    }

    loadProfile()
  }, [form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      // Get the current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        throw new Error("User not authenticated")
      }

      // Update the user's profile in the database
      const { error: profileError } = await supabase.from("profiles").upsert({
        id: user.id,
        full_name: values.fullName,
        location: values.location,
        travel_frequency: values.travelFrequency,
        travel_style: values.travelStyle,
        sustainability_preferences: values.sustainabilityPreferences,
        bio: values.bio || null,
        newsletter_opt_in: values.newsletterOptIn,
      })

      if (profileError) {
        console.error("Profile update error:", profileError)
        throw profileError
      }

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      })

      // Redirect to dashboard
      router.push("/dashboard")
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

  if (initialLoading) {
    return <div className="flex justify-center py-8">Loading your profile...</div>
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4 rounded-lg border p-6">
          <h2 className="text-xl font-semibold">Personal Information</h2>

          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="City, Country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio (optional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Tell us a bit about yourself..." className="min-h-[100px]" {...field} />
                </FormControl>
                <FormDescription>Share a bit about yourself and your travel interests.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4 rounded-lg border p-6">
          <h2 className="text-xl font-semibold">Travel Preferences</h2>

          <FormField
            control={form.control}
            name="travelFrequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How often do you travel?</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select travel frequency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="rarely">Rarely (Once a year or less)</SelectItem>
                    <SelectItem value="occasionally">Occasionally (2-3 times a year)</SelectItem>
                    <SelectItem value="frequently">Frequently (4-6 times a year)</SelectItem>
                    <SelectItem value="very-frequently">Very Frequently (Monthly or more)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="travelStyle"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>What's your travel style?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="luxury" />
                      </FormControl>
                      <FormLabel className="font-normal">Luxury (High-end accommodations and experiences)</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="comfort" />
                      </FormControl>
                      <FormLabel className="font-normal">Comfort (Mid-range accommodations with some luxury)</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="budget" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Budget (Affordable options without sacrificing experience)
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="backpacker" />
                      </FormControl>
                      <FormLabel className="font-normal">Backpacker (Minimalist and cost-effective)</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sustainabilityPreferences"
            render={({ field }) => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Sustainability Preferences</FormLabel>
                  <FormDescription>
                    Select the sustainability initiatives that are most important to you.
                  </FormDescription>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {sustainabilityPreferences.map((item) => (
                    <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, item.id])
                              : field.onChange(field.value?.filter((value) => value !== item.id))
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{item.label}</FormLabel>
                    </FormItem>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="newsletterOptIn"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Subscribe to our newsletter</FormLabel>
                <FormDescription>Receive updates about sustainable travel opportunities and tips.</FormDescription>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Saving..." : "Complete Profile"}
        </Button>
      </form>
    </Form>
  )
}
