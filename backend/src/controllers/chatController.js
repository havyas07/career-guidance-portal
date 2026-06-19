import { openai, isAIEnabled } from "../config/openai.js";

const CHAT_MODEL = process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini";

export async function chat(req, res) {
  const { messages, student } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages are required" });
  }

  if (!isAIEnabled) {
    console.warn("[Next Move] No OPENAI_API_KEY — returning MOCK chat reply.");
    return res.json({ reply: mockReply(messages), mock: true });
  }

  try {
    const reply = await chatWithAI({ messages, student });
    return res.json({ reply, mock: false });
  } catch (err) {
    console.error("OpenAI error:", err.message);
    console.warn("[Next Move] Falling back to MOCK chat reply.");
    return res.json({ reply: mockReply(messages), mock: true });
  }
}

async function chatWithAI({ messages, student }) {
  const completion = await openai.chat.completions.create({
    model: CHAT_MODEL,
    temperature: 0.7,
    messages: [
      { role: "system", content: buildSystemPrompt(student) },
      // keep the last ~20 turns for context without bloating tokens
      ...messages.slice(-20),
    ],
  });
  return completion.choices[0].message.content;
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
  return `Thanks for asking! 🌟 (Demo mode — add an OpenAI key for real AI answers.)

You said: "${lastUser}"

In the full version, I'd give you a clear, India-specific answer about careers, salaries, streams, and colleges — in Hindi or English. Ask me anything about your career journey!`;
}