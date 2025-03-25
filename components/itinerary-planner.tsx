"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Edit, Download } from "lucide-react";

export function ItineraryPlanner() {
  const [activeTab, setActiveTab] = useState("generator");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [selectedsource, setSelectedsource] = useState("");
  const [selecteddestination, setSelecteddestination] = useState("");
  const [selectedstart, setSelectedstart] = useState("");
  const [selectedend, setSelectedend] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [numberOfTravelers, setNumberOfTravelers] = useState("");
  const [selectedAccommodation, setSelectedAccommodation] = useState("");
  const [selectedMeal, setSelectedMeal] = useState("");
  const [specialRequirements, setSpecialRequirements] = useState("");

  const [itinerary, setItinerary] = useState<string>("");

  // Function to send data to Express backend (server.js)
  const handleGenerate = async () => {
    if (!selectedsource || !selecteddestination || !selectedstart || !selectedend || !selectedInterest || !selectedBudget) {
      alert("Please fill all required fields.");
      return;
    }
    
  
    setGenerating(true);
    setGenerated(false);
    setItinerary(""); // Clear previous itinerary
  
    try {
      const response = await fetch("http://localhost:5000/api/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          interest: selectedInterest,
          budget: selectedBudget,
          source: selectedsource, // Add source field
          destination: selecteddestination, // Add destination field
          startDate: selectedstart, // Add travel start date
          endDate: selectedend, // Add travel end date
          numberOfTravelers: numberOfTravelers || 1, // Default to 1 if empty
          accommodation: selectedAccommodation || "None",
          meal: selectedMeal || "No Preference",
          specialRequirements: specialRequirements.trim() || "None"
        }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to generate itinerary");
      }
  
      setItinerary(data.itinerary);
      setGenerated(true);
    } catch (error) {
      console.error("API request failed:", error);
    } finally {
      setGenerating(false);
    }
  };
  

  return (
    <div className="space-y-6">
      <Tabs defaultValue="generator" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="generator">AI Generator</TabsTrigger>
          <TabsTrigger value="saved">Saved Itineraries</TabsTrigger>
        </TabsList>

        <TabsContent value="generator" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card>
              <CardHeader>
                <CardTitle>Generate Your Perfect Itinerary</CardTitle>
                <CardDescription>Tell us about your trip and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Source</Label>
                    <Input
                      name="source"
                      placeholder="e.g. Pune, Hyderabad"
                      value={selectedsource}
                      onChange={(e) => setSelectedsource(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Destination</Label>
                    <Input
                      name="destination"
                      placeholder="e.g. Pune, Hyderabad"
                      value={selecteddestination}
                      onChange={(e) => setSelecteddestination(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Travel Dates</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="date"
                      name="startDate"
                      value={selectedstart}
                      onChange={(e) => setSelectedstart(e.target.value)}
                    />
                    <Input
                      type="date"
                      name="endDate"
                      value={selectedend}
                      onChange={(e) => setSelectedend(e.target.value)}
                    />
                  </div>
      </div>

                <div className="flex flex-wrap -mx-2">
              {/* Interests */}
              <div className="w-1/2 px-2 space-y-2">
                <label className="text-sm font-medium">Interests</label>
                <select
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  value={selectedInterest || "ALL"}
                  onChange={(e) => setSelectedInterest(e.target.value)}
                >
                  {["ALL", "Culture", "Food", "Nature", "Shopping", "History", "Art", "Adventure", "Relaxation"].map((interest) => (
                    <option key={interest} value={interest}>
                      {interest}
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget Level */}
              <div className="w-1/2 px-2 space-y-2">
                <label className="text-sm font-medium">Budget Level</label>
                <select
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Mid-range">Medium</option>
                  <option value="Luxury">High</option>
                </select>
              </div>

              {/* Meal Preferences */}
              <div className="w-1/2 px-2 space-y-2">
                <label className="text-sm font-medium">Meal Preferences</label>
                <select
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  value={selectedMeal || "No Preference"}
                  onChange={(e) => setSelectedMeal(e.target.value)}
                >
                  {["No Preference", "Vegetarian", "Vegan", "Non-Vegetarian"].map((meal) => (
                    <option key={meal} value={meal}>
                      {meal}
                    </option>
                  ))}
                </select>
              </div>

                {/* Number of Travelers */}
                 <div className="w-1/2 px-2 space-y-2">
                <label className="text-sm font-medium">Number of Travelers</label>
                <input
                  type="number"
                  min="1"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  value={numberOfTravelers}
                  onChange={(e) => setNumberOfTravelers(e.target.value)}
                  placeholder="Enter number of travelers"
                />
              </div>

              {/* Accommodation Preference */}
              <div className="w-1/2 px-2 space-y-2">
                <label className="text-sm font-medium">Accommodation Preference</label>
                <select
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  value={selectedAccommodation || "No Preference"}
                  onChange={(e) => setSelectedAccommodation(e.target.value)}
                >
                  {["No Preference", "Budget Stay", "Mid-Range Hotel", "Luxury Resort", "Hostel", "Airbnb", "Boutique Hotel"].map(
                    (option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>


            <div className="space-y-2">
              <Label className="text-sm font-medium">Special Requirements</Label>
              <Textarea
                placeholder="e.g. Traveling with kids, accessibility needs, dietary restrictions..."
                value={specialRequirements}
                onChange={(e) => setSpecialRequirements(e.target.value)}
              />
            </div>

              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={handleGenerate} 
                  disabled={generating || !selectedInterest || !selectedBudget}
                >
                  {generating ? "Generating..." : "Generate"}
                </Button>
              </CardFooter>
            </Card>

            {/* Generated Itinerary */}
            <Card className={generated ? "" : "opacity-60"}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Your Itinerary</CardTitle>
                    <CardDescription>
                      {generated ? "Generated travel plan" : "Waiting for AI to generate..."}
                    </CardDescription>
                  </div>
                  {generated && (
                    <Badge className="bg-blue-600 text-white">
                      <Sparkles className="mr-1 h-3 w-3" />
                      AI Generated
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {generated ? (
                  itinerary.split("\n").map((paragraph, index) => (
                    paragraph.trim() && <p key={index} className="text-sm">{paragraph}</p>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Click "Generate" to create your itinerary.</p>
                )}
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
  );
}

