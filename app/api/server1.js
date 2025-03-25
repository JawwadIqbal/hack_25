import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

dotenv.config();
const app = express();
const PORT = 5001;

app.use(cors()); 
app.use(express.json()); 

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!apiKey) {
  console.error("❌ API Key is missing. Check your .env file.");
  process.exit(1);
}

const chatModel = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-pro",
  apiKey: apiKey,
});

// Enhanced link configuration with tracking parameters
const TRANSPORT_LINKS = {
  plane: {
    baseUrl: "https://www.skyscanner.co.in/transport/flights",
    params: {
      origin: encodeURIComponent(source),
      destination: encodeURIComponent(destination),
      date: travelDate,
      utm_source: "travel_app",
      utm_medium: "api"
    }
  },
  train: {
    baseUrl: "https://www.irctc.co.in/nget/train-search",
    params: {
      from: encodeURIComponent(source),
      to: encodeURIComponent(destination),
      journeyDate: travelDate,
      src: "travel_app"
    }
  },
  bus: {
    baseUrl: "https://www.redbus.in/search",
    params: {
      from: encodeURIComponent(source),
      to: encodeURIComponent(destination),
      date: travelDate,
      src: "travel_api"
    }
  }
};

// Fallback URLs in case parameter construction fails
const FALLBACK_LINKS = {
  plane: "https://www.skyscanner.co.in/",
  train: "https://www.irctc.co.in/",
  bus: "https://www.redbus.in/"
};

const buildBookingLink = (type, source, destination, travelDate) => {
  try {
    const config = TRANSPORT_LINKS[type];
    if (!config) return FALLBACK_LINKS[type] || FALLBACK_LINKS.plane;
    
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(config.params)) {
      params.append(key, value);
    }
    
    return `${config.baseUrl}?${params.toString()}`;
  } catch (error) {
    console.error(`Error building ${type} link:`, error);
    return FALLBACK_LINKS[type] || FALLBACK_LINKS.plane;
  }
};

app.post("/api/get-travel-options", async (req, res) => {
  const { source, destination, travelDate } = req.body;

  if (!source || !destination || !travelDate) {
    return res.status(400).json({ error: "Source, destination, and travel date are required." });
  }

  try {
    console.log("Generating travel options for:", { source, destination, travelDate });

    const systemPrompt = `You are a travel assistant. Provide exactly 6 travel options from ${source} to ${destination} on ${travelDate} as JSON.
      Include flights, trains, and buses. For each option include:
      - departureTime (e.g., "08:30 AM")
      - arrivalTime (e.g., "10:45 AM")  
      - duration (e.g., "2h 15m")
      - price (e.g., "₹249")
      - type ("plane", "train", or "bus")
      - icon ("plane", "train", or "bus")
      
      Example format:
      {
        "travelOptions": [
          {
            "departureTime": "08:30 AM",
            "arrivalTime": "10:45 AM",
            "duration": "2h 15m",
            "price": "₹249",
            "type": "plane",
            "icon": "plane"
          },
          ...
        ]
      }`;

    const response = await chatModel.invoke([
      { role: "system", content: systemPrompt },
      { role: "user", content: `Find options from ${source} to ${destination} on ${travelDate}` },
    ]);

    if (!response.content) {
      return res.status(500).json({ error: "AI response was empty" });
    }

    let travelOptions;
    try {
      const cleanedText = response.content.replace(/```json|```/g, "").trim();
      travelOptions = JSON.parse(cleanedText);
      
      // Process each option with proper link building
      travelOptions.travelOptions = travelOptions.travelOptions.map(option => {
        const transportType = option.type?.toLowerCase() || 'plane';
        const validType = ['plane', 'train', 'bus'].includes(transportType) 
          ? transportType 
          : 'plane';
          
        return {
          departureTime: option.departureTime || option.departure,
          arrivalTime: option.arrivalTime || option.arrival,
          duration: option.duration,
          price: option.price,
          type: validType,
          icon: validType,
          bookingLink: buildBookingLink(validType, source, destination, travelDate)
        };
      });
    } catch (err) {
      console.error("Parsing error:", err);
      return res.status(500).json({ error: "Failed to process travel options" });
    }

    res.json(travelOptions);
  } catch (err) {
    console.error("API error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});