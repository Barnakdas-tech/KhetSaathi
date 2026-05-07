import { GoogleGenerativeAI } from '@google/generative-ai';

// Get API Key from environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Mock data to show if API key is missing (for demo safety)
const fallbackData = {
  "topRecommendation": {
    "crop": "Wheat",
    "expectedProfit": 45000,
    "explanation": "Perfect soil and weather for wheat right now."
  },
  "profitScenarios": [
    { "scenario": "Worst Case", "profit": 30000 },
    { "scenario": "Expected", "profit": 45000 },
    { "scenario": "Best Case", "profit": 60000 }
  ],
  "farmingSuggestions": [
    "Sow seeds in next 3 days.",
    "Use organic fertilizer for better yield."
  ],
  "warnings": ["Low rainfall expected next week."]
};

export async function analyzeAgriData(weather, soil) {
  // If no API key, return fallback data immediately
  if (!API_KEY) {
    console.warn("No Gemini API key found. Using fallback data for demo.");
    return fallbackData;
  }

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Simple prompt for the AI
    const prompt = `
      Act as an Agri-Expert. Based on these conditions:
      Weather: ${JSON.stringify(weather)}
      Soil: ${JSON.stringify(soil)}

      Provide a recommendation in this EXACT JSON format:
      {
        "topRecommendation": { "crop": "Name", "expectedProfit": 50000, "explanation": "Reason" },
        "profitScenarios": [
          { "scenario": "Worst Case", "profit": 30000 },
          { "scenario": "Expected", "profit": 50000 },
          { "scenario": "Best Case", "profit": 70000 }
        ],
        "farmingSuggestions": ["Tip 1", "Tip 2"],
        "warnings": ["Warning 1"]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean and parse the JSON from AI response
    const jsonString = text.replace(/```json|```/g, "").trim();
    return JSON.parse(jsonString);

  } catch (error) {
    console.error("AI Error:", error);
    return fallbackData;
  }
}
