import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"

export function JourneyPlanner() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Journey Planner</CardTitle>
        <CardDescription>Create and manage your sustainable travel journeys</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-[200px] flex-col items-center justify-center rounded-md border border-dashed">
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <PlusCircle className="h-10 w-10 text-muted-foreground" />
            <div className="text-xl font-medium">No journeys yet</div>
            <div className="text-sm text-muted-foreground">Start planning your sustainable travel experience</div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href="/dashboard/journey/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Journey
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
