import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, TrendingUp, Clock, DollarSign } from "lucide-react"
import Image from "next/image"

export function Recommendations() {
  const recommendations = [
    {
      id: 1,
      title: "Weekend in Paris",
      image: "/placeholder.svg?height=200&width=400",
      description: "Experience the city of lights with this optimized weekend itinerary",
      price: 450,
      savings: "15%",
      duration: "3 days",
      tags: ["Romantic", "Cultural", "Popular"],
      type: "Best Deal",
    },
    {
      id: 2,
      title: "Barcelona Express",
      image: "/placeholder.svg?height=200&width=400",
      description: "The perfect balance of beach, culture and cuisine in Barcelona",
      price: 380,
      savings: "22%",
      duration: "4 days",
      tags: ["Beach", "Architecture", "Cuisine"],
      type: "Trending",
    },
    {
      id: 3,
      title: "Amsterdam Adventure",
      image: "/placeholder.svg?height=200&width=400",
      description: "Explore the canals and culture of Amsterdam with this curated trip",
      price: 320,
      savings: "18%",
      duration: "3 days",
      tags: ["Cultural", "Nightlife", "Scenic"],
      type: "Smart Route",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-center gap-2 mb-8">
        <Badge className="px-3 py-1 text-sm bg-gradient-to-r from-blue-600 to-teal-500 text-white">
          <Sparkles className="mr-1 h-4 w-4" />
          AI-Powered Recommendations
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((item) => (
          <Card key={item.id} className="overflow-hidden transition-all hover:shadow-lg">
            <div className="relative">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 right-3">
                <Badge
                  className={`
                  ${item.type === "Best Deal" ? "bg-green-500" : ""}
                  ${item.type === "Trending" ? "bg-amber-500" : ""}
                  ${item.type === "Smart Route" ? "bg-blue-500" : ""}
                  text-white
                `}
                >
                  {item.type === "Best Deal" && <DollarSign className="mr-1 h-3 w-3" />}
                  {item.type === "Trending" && <TrendingUp className="mr-1 h-3 w-3" />}
                  {item.type === "Smart Route" && <Sparkles className="mr-1 h-3 w-3" />}
                  {item.type}
                </Badge>
              </div>
            </div>

            <CardHeader className="pb-2">
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                  <span className="text-sm">{item.duration}</span>
                </div>
                <div className="flex items-center text-green-600">
                  <span className="text-sm font-medium">Save {item.savings}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-2">
                {item.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>

            <CardFooter className="flex justify-between border-t pt-4">
              <div>
                <p className="text-sm text-muted-foreground">From</p>
                <p className="font-bold text-lg">${item.price}</p>
              </div>
              <Button>View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button variant="outline" className="rounded-full px-8">
          View More Recommendations
        </Button>
      </div>
    </div>
  )
}

