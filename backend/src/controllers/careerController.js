import { cohere, isAIEnabled, MODEL } from "../config/ai.js";
import { safeJsonParse } from "../utils/json.js";

export async function generateCareerDetail(req, res) {
  const { career, studentName, class_grade, strengths } = req.body;

  if (!career || !career.name) {
    return res.status(400).json({ error: "career is required" });
  }

  if (!isAIEnabled) {
    console.warn("[Next Move] No COHERE_API_KEY — returning MOCK career detail.");
    return res.json({ detail: mockDetail(career), mock: true });
  }

  try {
    const detail = await buildDetailWithAI({ career, studentName, class_grade, strengths });
    return res.json({ detail, mock: false });
  } catch (err) {
    console.error("Cohere error:", err.message);
    console.warn("[Next Move] Falling back to MOCK career detail.");
    return res.json({ detail: mockDetail(career), mock: true });
  }
}

async function buildDetailWithAI({ career, studentName, class_grade, strengths }) {
  const strengthsText = (strengths || []).map((s) => s.title).join(", ") || "not specified";

  const systemPrompt = `You are an expert career counsellor for Indian students in Class 10 and 12.
Explain a career in simple, encouraging language with Indian context (streams, exams, INR salaries).
Respond with ONLY valid JSON — no markdown — in this exact shape:
{
  "overview": "2-3 sentences on what this career really is",
  "why_fits_you": "1-2 sentences linking the career to the student's strengths",
  "day_in_life": ["4 short bullet points of typical daily tasks"],
  "key_skills": ["5 to 6 skills needed"],
  "getting_started": ["3 to 4 concrete next steps a school student can take now"]
}`;

  const userPrompt = `Career: ${career.name}
Description: ${career.description}
Typical salary: ${career.salary_range}
Education path: ${career.education_path}
Student: ${studentName || "a student"}, Class ${class_grade || "?"}.
Student's top strengths: ${strengthsText}.

Generate the career detail JSON now.`;

  const response = await cohere.chat({
    model: MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  return safeJsonParse(response.message.content[0].text);
}

// ── Mock fallback (used when no key / on error) ──
function mockDetail(career) {
  const name = career.name;
  return {
    overview: `A ${name} works on real problems every day, combining creativity and skill to make an impact. It's a growing field in India with strong demand and clear paths to grow.`,
    why_fits_you: `Your strengths in problem-solving and creativity align closely with what makes a great ${name}.`,
    day_in_life: [
      `Start the day reviewing tasks and goals as a ${name}.`,
      "Collaborate with a team to plan and solve problems.",
      "Spend focused time on core hands-on work.",
      "Wrap up by reviewing progress and learning something new.",
    ],
    key_skills: [
      "Problem-solving",
      "Communication",
      "Creativity",
      "Attention to detail",
      "Continuous learning",
      "Teamwork",
    ],
    getting_started: [
      "Explore free online intro courses about this field.",
      "Talk to someone already working as a " + name + ".",
      "Pick the right subjects/stream for this path.",
      "Try a small project to test if you enjoy it.",
    ],
  };
}