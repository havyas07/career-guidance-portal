import { CohereClientV2 } from "cohere-ai";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.COHERE_API_KEY;

console.log("AI key loaded?", apiKey ? "YES ✅" : "NO ❌ (mock mode)");

export const isAIEnabled = Boolean(apiKey);
export const MODEL = process.env.AI_MODEL || "command-a-03-2025";

export const cohere = apiKey ? new CohereClientV2({ token: apiKey }) : null;