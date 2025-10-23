import { GoogleGenAI, Type } from "@google/genai";
import { ServiceProvider } from "../types";

// Never reference process.env in the browser. Use Vite env (import.meta.env) safely.
const getApiKey = (): string | undefined => {
  try {
    const env = (import.meta as any).env || {};
    return env.VITE_GEMINI_API_KEY as string | undefined;
  } catch {
    return undefined;
  }
};

const API_KEY = getApiKey();

let aiClient: GoogleGenAI | null = null;
const getAiClient = (): GoogleGenAI | null => {
  if (!API_KEY) {
    return null;
  }
  if (!aiClient) {
    try {
      aiClient = new GoogleGenAI({ apiKey: API_KEY });
    } catch (e) {
      // If library throws on bad init, keep client null
      aiClient = null;
    }
  }
  return aiClient;
};

const extractText = (response: any): string => {
  try {
    if (response && typeof response.text === 'function') {
      return response.text();
    }
    if (response && typeof response.text === 'string') {
      return response.text;
    }
    if (response && response.response && typeof response.response.text === 'function') {
      return response.response.text();
    }
  } catch (_) {
    // fall through to default
  }
  return "";
};

export async function callGemini(prompt: string): Promise<string> {
  const client = getAiClient();
  if (!client) {
    return "The AI assistant is currently unavailable. The API key is not configured.";
  }

  try {
    const response = await (client as any).models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    const text = extractText(response).trim();
    return text || "Sorry, I couldn't generate a response.";
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
  const client = getAiClient();
  if (!client) {
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
    const response = await (client as any).models.generateContent({
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

    const jsonText = extractText(response).trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error calling Gemini API for profile summary:", error);
    throw new Error("Failed to generate AI summary.");
  }
}