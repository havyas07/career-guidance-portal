export function safeJsonParse(text) {
  const cleaned = String(text).replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
}
