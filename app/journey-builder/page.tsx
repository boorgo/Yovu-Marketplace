import { JourneyBuilderProvider } from "@/lib/journey-builder-context"
import { JourneyBuilderInterface } from "@/components/journey/journey-builder-interface"

export default function JourneyBuilderPage() {
  return (
    <JourneyBuilderProvider>
      <JourneyBuilderInterface />
    </JourneyBuilderProvider>
  )
}
