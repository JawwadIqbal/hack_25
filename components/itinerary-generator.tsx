"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Hotel,
  Utensils,
  Camera,
  Plus,
  Trash2,
  Edit,
  Save,
  Download,
} from "lucide-react"
import Image from "next/image"

export function ItineraryGenerator() {
  const [activeTab, setActiveTab] = useState("generator")
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)

  const handleGenerate = () => {
    setGenerating(true)
    // Simulate API call
    setTimeout(() => {
      setGenerating(false)
      setGenerated(true)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="generator" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="generator">AI Generator</TabsTrigger>
          <TabsTrigger value="planner">Drag & Drop Planner</TabsTrigger>
          <TabsTrigger value="saved">Saved Itineraries</TabsTrigger>
        </TabsList>

        <TabsContent value="generator" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Generate Your Perfect Itinerary</CardTitle>
                <CardDescription>Tell us about your trip and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Destination</label>
                    <Input placeholder="e.g. Paris, France" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Trip Duration</label>
                    <Input placeholder="e.g. 5 days" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Travel Dates</label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input type="date" />
                    <Input type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Interests</label>
                  <div className="flex flex-wrap gap-2">
                    {["Culture", "Food", "Nature", "Shopping", "History", "Art", "Adventure", "Relaxation"].map(
                      (interest) => (
                        <Badge
                          key={interest}
                          variant="outline"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        >
                          {interest}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Budget Level</label>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      Budget
                    </Button>
                    <Button variant="outline" className="flex-1 bg-blue-50 border-blue-200">
                      Mid-range
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Luxury
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Special Requirements</label>
                  <Textarea placeholder="e.g. Traveling with kids, accessibility needs, dietary restrictions..." />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleGenerate} disabled={generating}>
                  {generating ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Itinerary
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card className={generated ? "" : "opacity-60"}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Your Paris Itinerary</CardTitle>
                    <CardDescription>5 days in the City of Light</CardDescription>
                  </div>
                  <Badge className="bg-blue-600 text-white">
                    <Sparkles className="mr-1 h-3 w-3" />
                    AI Generated
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative h-40 w-full overflow-hidden rounded-lg">
                  <Image src="/placeholder.svg?height=160&width=500" alt="Paris" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="font-bold">Paris, France</h3>
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-1 h-3 w-3" />
                      <span>June 15-20, 2023</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border-l-2 border-blue-500 pl-4 pb-6 relative">
                    <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-blue-500"></div>
                    <h4 className="font-medium">Day 1: Arrival & Eiffel Tower</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-start gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">9:00 AM - Arrive at Charles de Gaulle Airport</p>
                          <p className="text-xs text-muted-foreground">Take the RER B train to your hotel</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Hotel className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">12:00 PM - Check in at Hotel Le Marais</p>
                          <p className="text-xs text-muted-foreground">4-star hotel in the historic Marais district</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Utensils className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">2:00 PM - Lunch at Café de Flore</p>
                          <p className="text-xs text-muted-foreground">Classic French bistro experience</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Camera className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">4:00 PM - Visit the Eiffel Tower</p>
                          <p className="text-xs text-muted-foreground">Pre-booked tickets for sunset views</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-2 border-blue-500 pl-4 pb-6 relative">
                    <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-blue-500"></div>
                    <h4 className="font-medium">Day 2: Louvre & Notre Dame</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-start gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">9:00 AM - Breakfast at local patisserie</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Camera className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">10:00 AM - Louvre Museum</p>
                          <p className="text-xs text-muted-foreground">Skip-the-line tickets included</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <Edit className="mr-1 h-4 w-4" />
                  Customize
                </Button>
                <Button>
                  <Save className="mr-1 h-4 w-4" />
                  Save Itinerary
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="planner" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Drag & Drop Itinerary Planner</CardTitle>
              <CardDescription>Create and organize your perfect trip</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Day 1</h3>
                    <Button variant="ghost" size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <Card className="border-2 border-dashed p-4">
                    <div className="text-center text-muted-foreground">
                      <p className="text-sm">Drag activities here</p>
                      <p className="text-xs">or click to add</p>
                    </div>
                  </Card>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Day 2</h3>
                    <Button variant="ghost" size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <Card className="bg-blue-50 p-3 cursor-move">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-2">
                        <Camera className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Louvre Museum</p>
                          <p className="text-xs text-muted-foreground">10:00 AM - 1:00 PM</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </Card>

                  <Card className="bg-green-50 p-3 cursor-move">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-2">
                        <Utensils className="h-4 w-4 text-green-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Lunch at Café Marly</p>
                          <p className="text-xs text-muted-foreground">1:30 PM - 3:00 PM</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </Card>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Day 3</h3>
                    <Button variant="ghost" size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <Card className="border-2 border-dashed p-4">
                    <div className="text-center text-muted-foreground">
                      <p className="text-sm">Drag activities here</p>
                      <p className="text-xs">or click to add</p>
                    </div>
                  </Card>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Plus className="mr-1 h-4 w-4" />
                Add Day
              </Button>
              <Button>
                <Save className="mr-1 h-4 w-4" />
                Save Itinerary
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="saved" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <div className="relative h-40 w-full overflow-hidden">
                <Image src="/placeholder.svg?height=160&width=300" alt="Paris" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-white">
                  <h3 className="font-bold">Paris Getaway</h3>
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-1 h-3 w-3" />
                    <span>June 15-20, 2023</span>
                  </div>
                </div>
              </div>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Paris, France</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  5-day cultural exploration of Paris with museum visits and culinary experiences.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <Edit className="mr-1 h-4 w-4" />
                  Edit
                </Button>
                <Button size="sm">
                  <Download className="mr-1 h-4 w-4" />
                  Export
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <div className="relative h-40 w-full overflow-hidden">
                <Image src="/placeholder.svg?height=160&width=300" alt="Tokyo" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-white">
                  <h3 className="font-bold">Tokyo Adventure</h3>
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-1 h-3 w-3" />
                    <span>October 5-15, 2023</span>
                  </div>
                </div>
              </div>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Tokyo, Japan</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  10-day exploration of Tokyo's modern attractions and traditional culture.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <Edit className="mr-1 h-4 w-4" />
                  Edit
                </Button>
                <Button size="sm">
                  <Download className="mr-1 h-4 w-4" />
                  Export
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

