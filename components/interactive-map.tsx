"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, AlertTriangle, Clock, Info } from "lucide-react"

export function InteractiveMap() {
  const [mapView, setMapView] = useState("route")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Tabs defaultValue="route" className="w-auto" onValueChange={setMapView}>
          <TabsList>
            <TabsTrigger value="route">Route</TabsTrigger>
            <TabsTrigger value="traffic">Traffic</TabsTrigger>
            <TabsTrigger value="satellite">Satellite</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Navigation className="mr-1 h-4 w-4" />
            My Location
          </Button>
          <Button variant="outline" size="sm">
            <MapPin className="mr-1 h-4 w-4" />
            Points of Interest
          </Button>
        </div>
      </div>

      <div className="relative w-full h-[500px] bg-gray-100 rounded-xl overflow-hidden">
        {/* This would be replaced with an actual map integration */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=1000')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
        </div>

        {/* Map overlay elements */}
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <Card className="w-auto bg-white/90 backdrop-blur-sm">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">New York to Boston</span>
                <Badge variant="outline" className="ml-2">
                  <Clock className="mr-1 h-3 w-3" />
                  3h 15m
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="w-auto bg-white/90 backdrop-blur-sm">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-amber-600">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">Traffic delay on I-95</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Route points */}
        <div className="absolute top-1/4 left-1/4">
          <div className="relative">
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-600 rounded-full animate-ping opacity-75"></div>
            <div className="relative w-4 h-4 bg-blue-600 rounded-full border-2 border-white"></div>
          </div>
        </div>

        <div className="absolute bottom-1/3 right-1/3">
          <div className="relative">
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-red-600 rounded-full animate-ping opacity-75"></div>
            <div className="relative w-4 h-4 bg-red-600 rounded-full border-2 border-white"></div>
          </div>
        </div>

        {/* Map controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm">
            <span className="text-lg font-medium">+</span>
          </Button>
          <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm">
            <span className="text-lg font-medium">-</span>
          </Button>
        </div>

        {/* Info panel */}
        <div className="absolute bottom-4 left-4 max-w-sm">
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-base">Route Information</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Distance:</span>
                  <span className="font-medium">215 miles</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Time:</span>
                  <span className="font-medium">3h 15m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Traffic Conditions:</span>
                  <span className="font-medium text-amber-600">Moderate</span>
                </div>
                <div className="pt-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Info className="mr-1 h-4 w-4" />
                    View Turn-by-Turn Directions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Alternative Routes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                <div className="flex items-center">
                  <span className="font-medium mr-2">Route A</span>
                  <Badge variant="outline">Fastest</Badge>
                </div>
                <span>3h 15m</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded">
                <div className="flex items-center">
                  <span className="font-medium mr-2">Route B</span>
                  <Badge variant="outline">Scenic</Badge>
                </div>
                <span>3h 45m</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded">
                <div className="flex items-center">
                  <span className="font-medium mr-2">Route C</span>
                  <Badge variant="outline">Less Traffic</Badge>
                </div>
                <span>3h 30m</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Traffic Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Moderate traffic on I-95</p>
                  <p className="text-xs text-muted-foreground">Delay: ~15 minutes</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Construction on Route 1</p>
                  <p className="text-xs text-muted-foreground">Delay: ~25 minutes</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Toll road ahead</p>
                  <p className="text-xs text-muted-foreground">Cost: $8.50</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Points of Interest</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="text-sm">Rest Area</span>
                </div>
                <span className="text-xs text-muted-foreground">25 miles ahead</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm">Charging Station</span>
                </div>
                <span className="text-xs text-muted-foreground">42 miles ahead</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-amber-600 mr-2" />
                  <span className="text-sm">Scenic Viewpoint</span>
                </div>
                <span className="text-xs text-muted-foreground">78 miles ahead</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

