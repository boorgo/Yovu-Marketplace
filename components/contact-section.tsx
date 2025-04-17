import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin } from "lucide-react"

export function ContactSection() {
  return (
    <section className="w-full bg-yovu-mint py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter text-yovu-charcoal mb-4">Contact Us</h2>
            <p className="text-yovu-charcoal/80 mb-6">
              Have questions about sustainable travel or need help planning your eco-friendly journey? Get in touch with
              our team of sustainability experts.
            </p>

            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-yovu-charcoal mr-3" />
                <span className="text-yovu-charcoal">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-yovu-charcoal mr-3" />
                <span className="text-yovu-charcoal">contact@yovu.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-yovu-charcoal mr-3" />
                <span className="text-yovu-charcoal">123 Eco Street, Green City, 10001</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-md shadow-sm">
            <h3 className="text-xl font-bold text-yovu-charcoal mb-4">Send Us a Message</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-yovu-charcoal mb-1">
                  Name
                </label>
                <Input id="name" placeholder="Your name" className="bg-white border-yovu-mint" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-yovu-charcoal mb-1">
                  Email
                </label>
                <Input id="email" type="email" placeholder="Your email" className="bg-white border-yovu-mint" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-yovu-charcoal mb-1">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="How can we help you?"
                  className="min-h-[120px] bg-white border-yovu-mint"
                />
              </div>
              <Button type="submit" className="w-full bg-yovu-charcoal text-white">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
