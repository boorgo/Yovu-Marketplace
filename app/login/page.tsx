import type { Metadata } from "next"
import LoginPageClient from "./login-page-client"

export const metadata: Metadata = {
  title: "Login - Yovu",
  description: "Login to your Yovu account",
}

export default function LoginPage() {
  return <LoginPageClient />
}
