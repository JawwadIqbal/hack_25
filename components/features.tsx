import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Globe, Cloud, Zap, Shield, Languages } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: Bot,
      title: "AI Travel Assistant",
      description: "Get instant help with travel planning, disruptions, and recommendations from our AI assistant.",
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description:
        "Access travel options and information for destinations worldwide with comprehensive global coverage.",
    },
    {
      icon: Cloud,
      title: "Real-Time Updates",
      description: "Stay informed with real-time updates on flight status, traffic conditions, and weather forecasts.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Experience rapid search results and route calculations powered by our advanced algorithms.",
    },
    {
      icon: Shield,
      title: "Secure Booking",
      description: "Book with confidence using our secure payment system and data protection measures.",
    },
    {
      icon: Languages,
      title: "Multi-Language",
      description: "Access our platform in multiple languages for a seamless experience no matter where you're from.",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <Card key={index} className="bg-white/10 border-white/5">
          <CardHeader className="pb-2">
            <div className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center mb-2">
              <feature.icon className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-white">{feature.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-white/70">{feature.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

