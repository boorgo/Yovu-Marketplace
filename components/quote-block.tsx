import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function QuoteBlock() {
  return (
    <div className="bg-yovu-mint p-8 rounded-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-yovu-charcoal mb-2">Get a Personalized Quote</h2>
        <p className="text-yovu-charcoal">
          Tell us about your travel plans and we'll create a custom sustainable itinerary
        </p>
      </div>

      <div className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-yovu-charcoal mb-1">
              Full Name
            </label>
            <Input id="name" placeholder="John Doe" className="bg-white border-yovu-mint" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-yovu-charcoal mb-1">
              Email
            </label>
            <Input id="email" type="email" placeholder="john@example.com" className="bg-white border-yovu-mint" />
          </div>
        </div>

        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-yovu-charcoal mb-1">
            Destination
          </label>
          <Input id="destination" placeholder="Where would you like to go?" className="bg-white border-yovu-mint" />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-yovu-charcoal mb-1">
            Travel Details
          </label>
          <Textarea
            id="message"
            placeholder="Tell us about your travel preferences, dates, and any specific sustainability requirements."
            className="min-h-[100px] bg-white border-yovu-mint rounded-md"
          />
        </div>

        <Button className="w-full bg-yovu-charcoal text-white hover:bg-yovu-charcoal/90">Request Quote</Button>
      </div>
    </div>
  )
}
