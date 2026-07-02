console.log("🔴 THIS chatController.js IS RUNNING — Cohere version");

import { cohere, isAIEnabled, MODEL } from "../config/ai.js";

// Use the same model as the rest of the app (from ai.js / .env)
const CHAT_MODEL = MODEL;

export async function chat(req, res) {
  console.log("✅ chat() was called");
  const { messages, student } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    console.log("⚠️ no messages in body");
    return res.status(400).json({ error: "messages are required" });
  }

  if (!isAIEnabled) {
    console.warn("[Next Move] No COHERE_API_KEY — returning MOCK chat reply.");
    return res.json({ reply: mockReply(messages), mock: true });
  }

  console.log("🟢 about to call Cohere");
  try {
    const reply = await chatWithAI({ messages, student });
    console.log("🎉 Cohere replied successfully");
    return res.json({ reply, mock: false });
  } catch (err) {
    console.error("Cohere error FULL:", err);
    console.warn("[Next Move] Falling back to MOCK chat reply.");
    return res.json({ reply: mockReply(messages), mock: true });
  }
}

async function chatWithAI({ messages, student }) {
  console.log("→ Chat using model:", CHAT_MODEL);
  const response = await cohere.chat({
    model: CHAT_MODEL,
    messages: [
      { role: "system", content: buildSystemPrompt(student) },
      ...messages.slice(-20),
    ],
  });
  return response.message.content[0].text;
}

function buildSystemPrompt(student) {
  let context = "";
  if (student?.name) {
    context += `\nThe student's name is ${student.name}, Class ${student.class_grade || "?"}, from ${student.city || "India"}.`;
  }
  if (student?.report) {
    const top = (student.report.top_careers || [])
      .slice(0, 3)
      .map((c) => `${c.name} (${c.match}%)`)
      .join(", ");
    context += `\nTheir Clarity Score is ${student.report.clarity_score}/100. Their top career matches are: ${top}.`;
  }

  return `You are the "Next Move" AI Career Mentor for Indian students in Class 10 and 12.
You help with: career information (roles, day-in-the-life, INR salaries), stream guidance (Science vs Commerce vs Arts), college and entrance-exam info, and questions about the student's own career report.

Rules:
- Reply in the SAME language the student uses. If they write in Hindi, reply in Hindi. If Hinglish, mirror it.
- Keep answers friendly, encouraging, and simple — these are teenagers, often first-generation career-seekers.
- Be concise: a few short paragraphs or a tight list, not an essay.
- If you are unsure, say "I'm not certain — here's what I do know" and NEVER make up facts, fake salaries, or fake colleges.
- Use Indian context (INR, Indian colleges, JEE/NEET/CLAT etc.) where relevant.
${context}`;
}

// ── Mock fallback (no key / on error) ──
function mockReply(messages) {
  const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content || "";
  return `Thanks for asking! 🌟 (Demo mode — add a Cohere key for real AI answers.)

You said: "${lastUser}"

In the full version, I'd give you a clear, India-specific answer about careers, salaries, streams, and colleges — in Hindi or English. Ask me anything about your career journey!`;
}