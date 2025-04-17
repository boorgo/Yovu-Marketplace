import Link from "next/link"
import { Leaf, Twitter, Instagram, Facebook, Linkedin } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-yovu-charcoal/10 bg-yovu-mint">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-yovu-charcoal" />
              <span className="font-bold text-xl text-yovu-charcoal">Yovu</span>
            </Link>
            <p className="text-sm text-yovu-charcoal/80 mt-2">
              Yovu is a verified sustainable travel marketplace helping eco-conscious travelers craft and book
              impact-driven journeys with real-time sustainability tracking.
            </p>
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="text-yovu-charcoal hover:text-yovu-charcoal/80">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-yovu-charcoal hover:text-yovu-charcoal/80">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-yovu-charcoal hover:text-yovu-charcoal/80">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-yovu-charcoal hover:text-yovu-charcoal/80">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-yovu-charcoal mb-3">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#how-it-works" className="text-sm text-yovu-charcoal/80 hover:text-yovu-charcoal">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#impact-engine" className="text-sm text-yovu-charcoal/80 hover:text-yovu-charcoal">
                  Impact Engine
                </Link>
              </li>
              <li>
                <Link href="/#travel-options" className="text-sm text-yovu-charcoal/80 hover:text-yovu-charcoal">
                  Travel Options
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-sm text-yovu-charcoal/80 hover:text-yovu-charcoal">
                  Partner With Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-yovu-charcoal mb-3">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-yovu-charcoal/80 hover:text-yovu-charcoal">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/mission" className="text-sm text-yovu-charcoal/80 hover:text-yovu-charcoal">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-yovu-charcoal/80 hover:text-yovu-charcoal">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-yovu-charcoal/80 hover:text-yovu-charcoal">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-yovu-charcoal mb-3">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-yovu-charcoal/80 hover:text-yovu-charcoal">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-yovu-charcoal/80 hover:text-yovu-charcoal">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="text-sm text-yovu-charcoal/80 hover:text-yovu-charcoal">
                  Sustainability Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-yovu-charcoal/80 hover:text-yovu-charcoal">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-yovu-charcoal/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-yovu-charcoal/80">&copy; {new Date().getFullYear()} Yovu. All rights reserved.</p>
          <p className="text-sm text-yovu-charcoal/80 mt-2 md:mt-0">
            Making travel a force for good, one journey at a time.
          </p>
        </div>
      </div>
    </footer>
  )
}
