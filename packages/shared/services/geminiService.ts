import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { ServiceProvider } from "../types";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function callGemini(prompt: string): Promise<string> {
  if (!API_KEY) {
    return "The AI assistant is currently unavailable. The API key is not configured.";
  }

  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });
    const result = await chatSession.sendMessage(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I encountered an error. Please try again.";
  }
}

export interface ProfileSummary {
  summary: string;
  highlights: string[];
  notes: string[];
}

export async function generateProfileSummary(provider: ServiceProvider): Promise<ProfileSummary> {
  if (!API_KEY) {
    throw new Error("API key not configured.");
  }
  
  const prompt = `
    Based on the following profile and reviews for a service provider, generate a concise summary.
    
    Provider Name: ${provider.name}
    Service: ${provider.profile}
    Bio: ${provider.bio}
    
    Reviews:
    ${provider.reviews.map(r => `- "${r}"`).join('\n')}
    
    Please provide:
    1. A short, engaging summary of the provider (2-3 sentences).
    2. 2-3 positive highlights from their reviews.
    3. 1-2 constructive points or common themes from reviews, framed as "Things to Note". If all reviews are positive, mention their consistent high praise.
    
    Return the response ONLY in this JSON format.
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    // Look for the first '{' and the last '}' to extract the JSON object
    const startIndex = text.indexOf('{');
    const endIndex = text.lastIndexOf('}');
    if (startIndex === -1 || endIndex === -1) {
      throw new Error('Invalid JSON response from AI');
    }
    const jsonText = text.substring(startIndex, endIndex + 1);
    return JSON.parse(jsonText) as ProfileSummary;
  } catch (error) {
    console.error("Error calling Gemini API for profile summary:", error);
    throw new Error("Failed to generate AI summary.");
  }
}
