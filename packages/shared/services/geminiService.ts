import { GoogleGenAI, Type } from "@google/genai";
import { ServiceProvider } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function callGemini(prompt: string): Promise<string> {
  if (!API_KEY) {
    return "The AI assistant is currently unavailable. The API key is not configured.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
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
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: {
              type: Type.STRING,
              description: "A short, engaging summary of the provider."
            },
            highlights: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Positive highlights from reviews."
            },
            notes: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Constructive points or things to note."
            }
          },
          required: ["summary", "highlights", "notes"]
        }
      }
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error calling Gemini API for profile summary:", error);
    throw new Error("Failed to generate AI summary.");
  }
}