import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plane, Train, Bus, Car } from "lucide-react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { GoogleMap, LoadScript, DirectionsRenderer } from "@react-google-maps/api";

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = { lat: 20.5937, lng: 78.9629 }; // Default location (India)

const transportIcons = {
  plane: <Plane className="h-5 w-5 text-blue-600" />,
  train: <Train className="h-5 w-5 text-green-600" />,
  bus: <Bus className="h-5 w-5 text-orange-600" />,
  car: <Car className="h-5 w-5 text-gray-600" />,
};

export function TravelOptions() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travelOptions, setTravelOptions] = useState<TravelOption[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  // Type definition for travel options
  type TravelOption = {
    departure: string;
    arrival: string;
    duration: string;
    price: string;
    bookingLink: string;
    icon: string;
  };

  // Fetch travel options from API
  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    const requestData = { source, destination, travelDate };

    try {
      const response = await fetch("http://localhost:5001/api/get-travel-options", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (!response.ok) throw new Error(data.error || "Failed to fetch travel options");

      if (!Array.isArray(data.travelOptions)) {
        throw new Error("API did not return an array for travelOptions");
      }

      setTravelOptions(data.travelOptions);
      if (data.travelOptions.length > 0) {
        fetchDirections(source, destination);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Error fetching travel options.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch directions from Google Maps API
  const fetchDirections = async (origin: string, destination: string) => {
    if (!origin || !destination) return;

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING, // Change this based on transport type
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error("Error fetching directions:", status);
        }
      }
    );
  };

  // Ensure travelOptions is always an array before filtering
  const filteredOptions = Array.isArray(travelOptions)
    ? travelOptions.filter((option) => filter === "all" || option.icon === filter)
    : [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Travel Options</h1>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input placeholder="Source" value={source} onChange={(e) => setSource(e.target.value)} />
        <Input placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
        <Input type="date" value={travelDate} onChange={(e) => setTravelDate(e.target.value)} />
      </div>

      {/* Submit Button */}
      <Button onClick={handleSubmit} disabled={loading} className="mt-4">
        {loading ? "Searching..." : "Find Travel Options"}
      </Button>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Travel Option Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList className="grid grid-cols-5 w-auto">
            <TabsTrigger value="all" onClick={() => setFilter("all")}>All</TabsTrigger>
            <TabsTrigger value="plane" onClick={() => setFilter("plane")}>
              <Plane className="mr-2 h-4 w-4" /> Flights
            </TabsTrigger>
            <TabsTrigger value="train" onClick={() => setFilter("train")}>
              <Train className="mr-2 h-4 w-4" /> Trains
            </TabsTrigger>
            <TabsTrigger value="bus" onClick={() => setFilter("bus")}>
              <Bus className="mr-2 h-4 w-4" /> Buses
            </TabsTrigger>
            <TabsTrigger value="car" onClick={() => setFilter("car")}>
              <Car className="mr-2 h-4 w-4" /> Cars
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>

      {/* Travel Options List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOptions.length === 0 ? (
          <p className="text-gray-500">No travel options available.</p>
        ) : (
          filteredOptions.slice(0, 6).map((option, index) => (
            <Card key={index} className="p-4 shadow-lg">
              <CardContent>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  {transportIcons[option.icon as keyof typeof transportIcons] || null}
                  {option.departure} → {option.arrival}
                </CardTitle>
                <p className="text-sm text-gray-600">⏳ {option.duration}</p>
                <p className="text-xl font-bold mt-2">💰 {option.price}</p>
              </CardContent>
              <CardFooter>
                <a
                  href={option.bookingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Book Now
                </a>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      {/* Google Maps Integration */}
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        <GoogleMap mapContainerStyle={mapContainerStyle} center={defaultCenter} zoom={5}>
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
