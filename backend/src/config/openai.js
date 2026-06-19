import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

// If no key is set, the app runs in MOCK mode (safe for early dev).
export const isAIEnabled = Boolean(apiKey);
export const MODEL = process.env.OPENAI_MODEL || "gpt-4o";
export const openai = apiKey ? new OpenAI({ apiKey }) : null;