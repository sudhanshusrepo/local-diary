
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

let aiClient: GoogleGenAI | null = null;
const getAiClient = (): GoogleGenAI | null => {
  if (!API_KEY) {
    return null;
  }
  if (!aiClient) {
    try {
      aiClient = new GoogleGenAI({ apiKey: API_KEY });
    } catch (_) {
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
  } catch (_) {}
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
