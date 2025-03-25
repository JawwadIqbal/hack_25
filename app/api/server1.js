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
  process.exit(1); // Stop server if API key is missing
}

const chatModel = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-pro",
  apiKey: apiKey,
});

app.post("/api/get-travel-options", async (req, res) => {
  const { source, destination, travelDate } = req.body;

  if (!source || !destination || !travelDate) {
    return res.status(400).json({ error: "❌ Source, destination, and travel date are required." });
  }

  try {
    console.log("🚀 Generating travel options for:", { source, destination, travelDate });

    const systemPrompt = `You are a helpful travel assistant. Generate a JSON list of possible travel options 
      for a journey from ${source} to ${destination} on ${travelDate}.
      Format:
      {
        "travelOptions": [
          {
            "departure": "08:30 AM",
            "arrival": "10:45 AM",
            "duration": "2h 15m",
            "price": "₹249",
            "bookingLink": "https://example.com/train1",
            "icon": "plane"
          },
          ...
        ]
      } (Provide exactly 6 options.)`;

    const userPrompt = `Find travel options from ${source} to ${destination} on ${travelDate}.`;

    const response = await chatModel.invoke([
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ]);

    if (!response.content || response.content.trim() === "") {
      console.error("❌ AI response was empty.");
      return res.status(500).json({ error: "AI response was empty." });
    }

    let travelOptions;
    try {
      const cleanedText = response.content.replace(/```json|```/g, "").trim();
      travelOptions = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("❌ JSON Parse Error:", parseError);
      console.error("🔍 AI Response:", response.content);
      return res.status(500).json({ error: "Invalid response format from AI." });
    }

    res.json(travelOptions);
  } catch (err) {
    console.error("❌ API Error:", err);
    res.status(500).json({ error: `Error: ${err.message}` });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Travel API running on http://localhost:${PORT}`);
});
