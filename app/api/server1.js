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

// 1. DEFINITIVE LINK MAPPING - WE CONTROL THESE 100%
const TRANSPORT_DATA = {
  plane: {
    icon: "plane",
    bookingLink: "https://www.skyscanner.co.in/"
  },
  train: {
    icon: "train",
    bookingLink: "https://www.irctc.co.in/"
  },
  bus: {
    icon: "bus",
    bookingLink: "https://www.redbus.in/"
  }
};

// 2. STRICT TYPE VALIDATION
const normalizeTransportType = (rawType) => {
  if (!rawType) return "plane";
  
  const type = rawType.toString().toLowerCase().trim();
  
  if (type.includes("plane") || type.includes("flight") || type.includes("air")) return "plane";
  if (type.includes("train") || type.includes("rail")) return "train";
  if (type.includes("bus") || type.includes("road")) return "bus";
  
  return "plane"; // default
};

app.post("/api/get-travel-options", async (req, res) => {
  const { source, destination, travelDate } = req.body;

  if (!source || !destination || !travelDate) {
    return res.status(400).json({ error: "Source, destination, and travel date are required." });
  }

  try {
    // 3. SIMPLIFIED AI PROMPT - NO LINKS REQUESTED
    const systemPrompt = `You are a travel assistant. Provide exactly 6 travel options from ${source} to ${destination} on ${travelDate} as JSON.
      Include flights, trains, and buses. For each option provide ONLY:
      - departureTime (format: "08:30 AM")
      - arrivalTime (format: "10:45 AM")
      - duration (format: "2h 15m")
      - price (format: "₹249")
      - transportMode (ONLY use these exact values: "plane", "train", or "bus")
      
      Example response:
      {
        "options": [
          {
            "departureTime": "08:30 AM",
            "arrivalTime": "10:45 AM",
            "duration": "2h 15m",
            "price": "₹249",
            "transportMode": "plane"
          }
        ]
      }`;

    const response = await chatModel.invoke([
      { role: "system", content: systemPrompt },
      { role: "user", content: `Find travel options from ${source} to ${destination} on ${travelDate}` }
    ]);

    if (!response.content) {
      return res.status(500).json({ error: "AI response was empty" });
    }

    let rawOptions;
    try {
      const cleanedText = response.content.replace(/```json|```/g, "").trim();
      rawOptions = JSON.parse(cleanedText);
    } catch (err) {
      console.error("Parsing error:", err);
      return res.status(500).json({ error: "Failed to parse travel options" });
    }

    // 4. COMPLETE RESPONSE RECONSTRUCTION - WE CONTROL ALL LINKS
    const processedOptions = {
      travelOptions: rawOptions.options?.map(option => {
        const transportType = normalizeTransportType(option.transportMode || option.type);
        const transportInfo = TRANSPORT_DATA[transportType] || TRANSPORT_DATA.plane;

        return {
          departureTime: option.departureTime || "N/A",
          arrivalTime: option.arrivalTime || "N/A",
          duration: option.duration || "N/A",
          price: option.price || "N/A",
          type: transportType,
          icon: transportInfo.icon,
          bookingLink: transportInfo.bookingLink // OUR ENFORCED LINK
        };
      }) || []
    };

    // 5. FINAL VALIDATION - NO EXAMPLE.COM LINKS
    processedOptions.travelOptions.forEach(option => {
      if (option.bookingLink.includes("example.com")) {
        option.bookingLink = TRANSPORT_DATA.plane.bookingLink;
      }
    });

    res.json(processedOptions);
  } catch (err) {
    console.error("API error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});