import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { JourneyProvider } from "@/lib/journey-context"
import { cn } from "@/lib/utils"
import { ErrorBoundary } from "@/components/error-boundary"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Yovu - Sustainable Travel Platform",
  description: "Design your own sustainable journey with eco-conscious travel experiences",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <JourneyProvider>
            <ErrorBoundary>
              {children}
              <Toaster />
            </ErrorBoundary>
          </JourneyProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'