import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
// import { ChatOpenAI } from "@langchain/openai";
// import { ChatAnthropic } from "@langchain/anthropic";

const app = express();
const PORT = 5000;

app.use(cors()); // ✅ Prevent CORS errors
app.use(express.json()); // ✅ Parse JSON requests

dotenv.config();
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!apiKey) throw new Error("API Key is missing.");


const initializeChatModel = () => {
  return new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    apiKey: apiKey,
  });
};

// Define the API route
app.post("/api/generate-itinerary", async (req, res) => {
  const {
      interest,
      budget,
      source,
      destination,
      startDate,
      endDate,
      numberOfTravelers,
      accommodation,
      meal,
      specialRequirements
  } = req.body;

  // ✅ Validate all required fields
  if (!interest || !budget || !source || !destination || !startDate || !endDate) {
      return res.status(400).json({ error: "All required fields must be provided." });
  }

  try {
    console.log("🚀 Generating itinerary for:", { interest, budget });
    const chatModel = initializeChatModel();

    const systemPrompt = `
  You are an expert travel itinerary planner. Your job is to generate a well-structured, engaging, and visually appealing travel itinerary for a user based on their preferences.

  ###  Guidelines for Itinerary Generation 
  -  No Transportation Details 🚫 : Do not mention flights, trains, buses, or any transport mode.
  -  Daily Breakdown  : Each day should be written in  paragraph form , describing the experience in a flowing, engaging manner.
  -  Balanced Schedule  : Ensure a mix of sightseeing, relaxation, cultural activities, and meals.
  -  Personalization  : Tailor the itinerary to match the user's interests, budget, accommodation, and dietary preferences.
  - Local Experience  : Recommend hidden gems, cultural experiences, and authentic local dining spots.

  ###  Itinerary Format 
   Day 1: [Title]   
  🌞  Morning : [Describe activities in an engaging way, e.g., "Start your day with a visit to..."].  
  🌅  Afternoon : [Describe afternoon activities with immersive details].  
  🌙  Evening : [Describe the evening experience, ensuring a balance of relaxation and fun].  

   Day 2: [Title]   
  🌞  Morning : [Activity description]  
  🌅  Afternoon : [Activity description]  
  🌙  Evening : [Activity description]  

   Final Notes 📝   
  - Provide  essential travel tips .  
  - Mention any  local phrases  that might help.  
  - Recommend  packing tips  and cultural etiquette.  
  - End with a warm, engaging farewell message.  

  Ensure the text flows naturally, creating an immersive experience for the traveler! 🚀
`;


    const userPrompt = `
      Generate a detailed travel itinerary for a trip with the following details:

      -  Source City : ${source}
      -  Destination : ${destination}
      -  Travel Dates : ${startDate} to ${endDate}
      -  Number of Travelers : ${numberOfTravelers}
      -  Budget : ${budget} budget
      -  Accommodation Type : ${accommodation}
      -  Meal Preferences : ${meal}
      -  Interests : ${interest}
      -  Special Requirements : ${specialRequirements || "None"}

      Ensure each day has  different activities , covering the user’s interests.
       No transportation details  should be included. Only list activities.
    `;

    const response = await chatModel.invoke([
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ]);

    const generatedText = response?.content || "No itinerary generated.";
    res.status(200).json({ itinerary: generatedText });

  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: `Error: ${err.message}` });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ API running on http://localhost:${PORT}`);
});
