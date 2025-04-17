import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

export function RecommendedExperiences() {
  // This would typically fetch from your API/database
  const experiences = [
    {
      id: "1",
      title: "Eco-Friendly Treehouse Retreat",
      location: "Costa Rica",
      type: "Accommodation",
      price: "$120",
      rating: 4.8,
      image: "/placeholder.svg?height=100&width=200",
      carbonFootprint: "Low",
      sustainabilityFeatures: ["Solar Powered", "Rainwater Harvesting"],
    },
    {
      id: "2",
      title: "Sustainable Hiking Adventure",
      location: "Norway",
      type: "Activity",
      price: "$85",
      rating: 4.9,
      image: "/placeholder.svg?height=100&width=200",
      carbonFootprint: "Very Low",
      sustainabilityFeatures: ["Leave No Trace", "Local Guides"],
    },
    {
      id: "3",
      title: "Farm-to-Table Cooking Class",
      location: "Italy",
      type: "Activity",
      price: "$65",
      rating: 4.7,
      image: "/placeholder.svg?height=100&width=200",
      carbonFootprint: "Low",
      sustainabilityFeatures: ["Organic Produce", "Zero Waste"],
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Experiences</CardTitle>
        <CardDescription>Sustainable experiences tailored to your preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {experiences.map((experience) => (
            <Card key={experience.id} className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={experience.image || "/placeholder.svg"}
                  alt={experience.title}
                  className="h-full w-full object-cover transition-all hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="mb-2">
                    {experience.type}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{experience.price}</span>
                </div>
                <h3 className="font-semibold">{experience.title}</h3>
                <p className="text-sm text-muted-foreground">{experience.location}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {experience.sustainabilityFeatures.map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button asChild variant="ghost" className="w-full">
                  <Link href={`/experiences/${experience.id}`}>
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href="/experiences">
            Browse All Experiences
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
