"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardNav } from "@/components/dashboard-nav"
import { DashboardHeader } from "@/components/dashboard-header"
import { TravelOptions } from "@/components/travel-options"
import { CostEstimator } from "@/components/cost-estimator"
import { ItineraryPlanner } from "@/components/itinerary-planner"
import AIAssistant from "@/components/ai-assistant"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("assistant")
  const router = useRouter()

  const handleContactUs = () => {
    router.push("/dashboard/contact")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardNav />
        <main className="flex-1 p-6">
          <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <div className="flex gap-2">
                <Button>New Trip</Button>
                <Button variant="outline" onClick={handleContactUs}>
                  Contact Us
                </Button>
              </div>
            </div>

            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary Planner</TabsTrigger>
                <TabsTrigger value="options">Travel Options</TabsTrigger>
                <TabsTrigger value="cost">Cost Estimator</TabsTrigger>
              </TabsList>
              <TabsContent value="assistant" className="mt-6">
                <AIAssistant />
              </TabsContent>
              <TabsContent value="itinerary" className="mt-6">
                <ItineraryPlanner />
              </TabsContent>
              <TabsContent value="options" className="mt-6">
                <TravelOptions />
              </TabsContent>
              <TabsContent value="cost" className="mt-6">
                <CostEstimator />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}