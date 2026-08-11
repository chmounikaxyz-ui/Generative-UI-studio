import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

async function checkModels() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.list();
  console.log("Available models:");
  for await (const m of response) {
    if (m.name.includes("gemini")) {
      console.log(`- ${m.name} (version: ${m.version}, disp: ${m.displayName})`);
    }
  }
}
checkModels().catch(console.error);
