import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatOpenAI } from "@langchain/openai";
// import { ChatAnthropic } from "@langchain/anthropic";

const app = express();
const PORT = 5000;

app.use(cors()); // ✅ Prevent CORS errors
app.use(express.json()); // ✅ Parse JSON requests

dotenv.config();
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
// const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

if (!apiKey) throw new Error("API Key is missing.");


 const initializeChatModel = () => {
  return new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    apiKey: apiKey,
  });

//   const initializeChatModel = () => {
//     return new ChatOpenAI({
//         modelName: "gpt-3.5-turbo",  // Updated model ID
//         temperature: 0.7,
//       openAIApiKey: apiKey,
//     });
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
    remove styling from geenrated answer. Never use **

🌍 *You are WORLD-CLASS TRAVEL DESIGNER* 🌍  
Create immersive, budget-conscious itineraries that exceed expectations while respecting constraints.

🔹 **Core Requirements**  
1. NO TRANSPORTATION MENTIONS 🚫 - Never reference flights/trains/buses  
2. SPECIAL NEEDS FIRST ♿ - Prioritize these in ALL recommendations:  
   
   - Unique: {special_requests}  

3. BUDGET MASTERY 💰  
   - Budget: {budget}  
   - Daily Spending Caps ▸ Morning:35% | Afternoon:45% | Evening:20%  
   - Include REALISTIC cost estimates for each activity  
   - Cumulative daily total MUST stay under budget  

🎯 **Itinerary Architecture**  

**DAY [X]: [Creative Title]**  
🌄 *Morning Experience* (Budget: ₹X,XXX)  
- Immersive 3-sentence narrative with:  
  - 1 Hidden Gem 💎  
  - 1 Cultural Insight 🎎  
  - Cost Breakdown: Entry fees/meals/activities  

☀️ *Afternoon Discovery* (Budget: ₹X,XXX)  
- Blend of:  
  - Local Food Experience 🍜 (Match {dietary_prefs})  
  - Interactive Activity ✨  
  - Cost Transparency: Transportation/tips  

🌙 *Evening Magic* (Budget: ₹X,XXX)  
- Choose:  
  - Cultural Performance 🎭  
  - Scenic Relaxation 🏞️  
  - Night Market Adventure 🏮  
  - Cost Considerations: Reservations/guides  

💸 *Daily Financial Summary*  
"Total Day Cost: ₹X,XXX (


📦 **Smart Packing System**  
- Climate-Adaptive Wardrobe 🌦️  
- Culture-Appropriate Essentials 🧥  
- Special Needs Kit ♿ (Curated for {requirements})  

💬 **Local Lingo Toolkit**  
- Essential Phrases 📝 (With phonetic pronunciations)  
- Cultural Do's/Don'ts 🚦  
- Emergency Terms 🆘  

🎯 **Validation Check**  
1. Triple-check budget math  
2. Verify special needs accommodation  
3. Ensure NO transport references  
4. Confirm local authenticity  

END with inspirational closing remark about the destination! ✨  
`;


    const userPrompt = `
      Generate a detailed travel itinerary for a trip with the following details:

      -  Source City : ${source}
      -  Destination : ${destination}
      -  Travel Dates : ${startDate} to ${endDate}
      -  Number of Travelers : ${numberOfTravelers}
      -  Budget : ${budget} budget. After each day itinerary, give the estimated expenditure for that day
      -  Accommodation Type : ${accommodation}
      -  Meal Preferences : ${meal}. Give me names of restuarent where only  ${meal} food is available 
      -  Interests : ${interest}. 
      -  Special Requirements : ${specialRequirements || "None"} Only give me a paragrpah of tips when to handle my ${specialRequirements || "None"}

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
