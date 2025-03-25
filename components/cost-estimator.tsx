"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plane, Train, Bus, Clock, Sparkles } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "@/components/ui/chart"

export function CostEstimator() {
  const [selectedRoute, setSelectedRoute] = useState("multimodal")

  const costData = [
    { name: "Flight", cost: 249, time: 135 },
    { name: "Train", cost: 89, time: 210 },
    { name: "Bus", cost: 45, time: 270 },
    { name: "Car", cost: 65, time: 195 },
    { name: "Multi-modal", cost: 120, time: 180 },
  ]

  const timeVsCostData = [
    { name: "Option 1", cost: 249, time: 135 },
    { name: "Option 2", cost: 180, time: 165 },
    { name: "Option 3", cost: 120, time: 180 },
    { name: "Option 4", cost: 89, time: 210 },
    { name: "Option 5", cost: 65, time: 195 },
    { name: "Option 6", cost: 45, time: 270 },
  ]

  const multimodalSteps = [
    {
      id: 1,
      type: "train",
      icon: Train,
      from: "City Center",
      to: "Central Station",
      time: "08:30 - 08:45",
      duration: "15m",
      price: 5,
    },
    {
      id: 2,
      type: "train",
      icon: Train,
      from: "Central Station",
      to: "Airport Terminal",
      time: "09:00 - 09:20",
      duration: "20m",
      price: 15,
    },
    {
      id: 3,
      type: "flight",
      icon: Plane,
      from: "Local Airport",
      to: "Destination Airport",
      time: "10:30 - 12:15",
      duration: "1h 45m",
      price: 89,
    },
    {
      id: 4,
      type: "bus",
      icon: Bus,
      from: "Destination Airport",
      to: "City Center",
      time: "12:45 - 13:15",
      duration: "30m",
      price: 11,
    },
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Cost Comparison</CardTitle>
            <CardDescription>Compare costs across different travel modes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={costData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="cost" fill="#3b82f6" name="Cost ($)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Time vs. Cost Analysis</CardTitle>
            <CardDescription>Find the perfect balance between time and money</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={timeVsCostData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="time"
                    label={{ value: "Time (minutes)", position: "insideBottomRight", offset: -10 }}
                  />
                  <YAxis label={{ value: "Cost ($)", angle: -90, position: "insideLeft" }} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="cost"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                  
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>AI-Powered Multi-Modal Trip Planning</CardTitle>
              <CardDescription>The smartest combination of transportation modes</CardDescription>
            </div>
            <Badge className="bg-blue-600 text-white">
              <Sparkles className="mr-1 h-4 w-4" />
              AI Optimized
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="multimodal" className="w-full" onValueChange={setSelectedRoute}>
            <TabsList className="grid grid-cols-3 w-full mb-6">
              <TabsTrigger value="multimodal">Multi-Modal</TabsTrigger>
              <TabsTrigger value="fastest">Fastest</TabsTrigger>
              <TabsTrigger value="cheapest">Cheapest</TabsTrigger>
            </TabsList>

            <TabsContent value="multimodal" className="mt-0">
              <div className="space-y-6">
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium">Total Duration: 2h 50m</p>
                    <p className="text-sm text-muted-foreground">Door to door journey</p>
                  </div>
                  <div>
                    <p className="font-medium">Total Cost: $120</p>
                    <p className="text-sm text-green-600">Save $129 vs. direct flight</p>
                  </div>
                </div>

                <div className="relative">
                  {multimodalSteps.map((step, index) => (
                    <div key={step.id} className="flex mb-8 relative">
                      <div className="mr-4 relative">
                        <div
                          className={`p-3 rounded-full 
                          ${step.type === "flight" ? "bg-blue-100 text-blue-600" : ""}
                          ${step.type === "train" ? "bg-amber-100 text-amber-600" : ""}
                          ${step.type === "bus" ? "bg-green-100 text-green-600" : ""}
                          ${step.type === "car" ? "bg-purple-100 text-purple-600" : ""}
                        `}
                        >
                          <step.icon className="h-6 w-6" />
                        </div>
                        {index < multimodalSteps.length - 1 && (
                          <div className="absolute top-12 bottom-0 left-1/2 w-0.5 bg-gray-200 -translate-x-1/2 h-8"></div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">
                              {step.from} to {step.to}
                            </h4>
                            <p className="text-sm text-muted-foreground">{step.time}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className="mb-1">
                              <Clock className="mr-1 h-3 w-3" />
                              {step.duration}
                            </Badge>
                            <p className="text-sm font-medium">${step.price}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button className="w-full">Select This Route</Button>
              </div>
            </TabsContent>

            <TabsContent value="fastest" className="mt-0">
              <div className="p-8 text-center">
                <p>Fastest route details would appear here</p>
              </div>
            </TabsContent>

            <TabsContent value="cheapest" className="mt-0">
              <div className="p-8 text-center">
                <p>Cheapest route details would appear here</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

