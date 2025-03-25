"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Bell, Clock, MessageSquare, X, CheckCircle, AlertCircle, Info } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Alerts() {
  const [activeTab, setActiveTab] = useState("all")

  const alerts = [
    {
      id: 1,
      type: "disruption",
      severity: "high",
      title: "Flight BA2490 Delayed",
      message: "Your flight BA2490 has been delayed by 2 hours. New departure time: 14:30.",
      time: "10 minutes ago",
      icon: AlertTriangle,
      iconColor: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      id: 2,
      type: "update",
      severity: "medium",
      title: "Gate Change Notification",
      message: "Your departure gate has changed from B12 to C45. Please allow extra time to reach the new gate.",
      time: "25 minutes ago",
      icon: Info,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      id: 3,
      type: "weather",
      severity: "medium",
      title: "Weather Alert",
      message: "Heavy rain expected at your destination. Pack accordingly and check for potential delays.",
      time: "1 hour ago",
      icon: AlertCircle,
      iconColor: "text-amber-500",
      bgColor: "bg-amber-50",
    },
    {
      id: 4,
      type: "update",
      severity: "low",
      title: "Check-in Now Available",
      message:
        "Online check-in is now available for your flight tomorrow. Check in now to secure your seat preference.",
      time: "3 hours ago",
      icon: CheckCircle,
      iconColor: "text-green-500",
      bgColor: "bg-green-50",
    },
  ]

  const filteredAlerts = activeTab === "all" ? alerts : alerts.filter((alert) => alert.type === activeTab)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Tabs defaultValue="all" className="w-auto" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">
              All Alerts
              <Badge className="ml-2 bg-gray-100 text-gray-900">{alerts.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="disruption">
              Disruptions
              <Badge className="ml-2 bg-gray-100 text-gray-900">
                {alerts.filter((a) => a.type === "disruption").length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="update">
              Updates
              <Badge className="ml-2 bg-gray-100 text-gray-900">
                {alerts.filter((a) => a.type === "update").length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="weather">
              Weather
              <Badge className="ml-2 bg-gray-100 text-gray-900">
                {alerts.filter((a) => a.type === "weather").length}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Button variant="outline" size="sm">
          <Bell className="mr-1 h-4 w-4" />
          Manage Notifications
        </Button>
      </div>

      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <Card
            key={alert.id}
            className={`${alert.bgColor} border-l-4 ${
              alert.severity === "high"
                ? "border-l-red-500"
                : alert.severity === "medium"
                  ? "border-l-amber-500"
                  : "border-l-blue-500"
            }`}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <div className={`p-2 rounded-full ${alert.bgColor}`}>
                    <alert.icon className={`h-5 w-5 ${alert.iconColor}`} />
                  </div>
                  <div>
                    <h4 className="font-medium">{alert.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                    <div className="flex items-center mt-2">
                      <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>AI Travel Assistant</CardTitle>
          <CardDescription>Get help with disruptions and travel changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="AI Assistant" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="bg-muted p-3 rounded-lg rounded-tl-none max-w-[80%]">
                <p className="text-sm">
                  Hello! I noticed your flight has been delayed. Would you like me to suggest alternative routes or help
                  you find nearby amenities while you wait?
                </p>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <div className="bg-primary text-primary-foreground p-3 rounded-lg rounded-tr-none max-w-[80%]">
                <p className="text-sm">Can you find me an earlier flight to the same destination?</p>
              </div>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
            </div>

            <div className="flex gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="AI Assistant" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="bg-muted p-3 rounded-lg rounded-tl-none max-w-[80%]">
                <p className="text-sm">
                  I found 3 earlier flights to your destination. The earliest one departs at 12:15 and has 2 seats
                  available. Would you like me to show you the details or help you rebook?
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2 border-t p-4">
          <Input placeholder="Type your message..." className="flex-1" />
          <Button>
            <MessageSquare className="mr-1 h-4 w-4" />
            Send
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }) {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}

