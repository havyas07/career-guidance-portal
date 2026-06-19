import { openai, isAIEnabled, MODEL } from "../config/openai.js";

export async function generateReport(req, res) {
  const { name, class_grade, city, answers } = req.body;

  if (!Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ error: "answers are required" });
  }

  // No API key → return a realistic mock so the frontend flow works.
  if (!isAIEnabled) {
    console.warn("[Next Move] OPENAI_API_KEY not set — returning MOCK report.");
    return res.json({ report: mockReport(name), mock: true });
  }

  try {
    const report = await buildReportWithAI({ name, class_grade, city, answers });
    return res.json({ report, mock: false });
  } catch (err) {
    console.error("OpenAI error:", err.message);
    // Graceful fallback — never block the student on an API/billing issue.
    console.warn("[Next Move] Falling back to MOCK report due to OpenAI error.");
    return res.json({ report: mockReport(name), mock: true });
  }
}

async function buildReportWithAI({ name, class_grade, city, answers }) {
  const answersText = answers
    .map((a, i) => `${i + 1}. ${a.question}\n   Answer: ${a.answer}`)
    .join("\n");

  const systemPrompt = `You are an expert career counsellor for Indian students in Class 10 and 12.
You understand the Indian education system (streams, entrance exams, colleges) and realistic Indian salary ranges in INR.
Based on a student's assessment answers, produce a personalised Career Clarity Report.
Be encouraging, specific, and India-relevant. Respond with ONLY valid JSON — no markdown, no extra text.

The JSON must match this exact shape:
{
  "dna_summary": "3 short sentences describing who this student is",
  "clarity_score": <integer 0-100>,
  "strengths": [
    { "title": "Strength name", "description": "1 simple sentence" }
  ],   // exactly 3
  "top_careers": [
    {
      "name": "Career name",
      "match": <integer 0-100>,
      "salary_range": "e.g. ₹4–12 LPA",
      "education_path": "short path, e.g. B.Des → UX specialisation",
      "description": "1-2 sentences on what they do"
    }
  ]    // exactly 10, sorted by match descending
}`;

  const userPrompt = `Student: ${name || "A student"}, Class ${class_grade || "?"}, ${city || "India"}.
Assessment answers:
${answersText}

Generate the Career Clarity Report JSON now.`;

  const completion = await openai.chat.completions.create({
    model: MODEL,
    temperature: 0.7,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  return JSON.parse(completion.choices[0].message.content);
}

// ── Mock fallback (used only when no API key) ──
function mockReport(name = "there") {
  return {
    dna_summary: `You're a curious and creative thinker who enjoys solving problems and building things. You value meaningful work and learn best by doing. You have strong potential in design and technology fields.`,
    clarity_score: 78,
    strengths: [
      { title: "Creative Problem-Solving", description: "You find fresh, original ways to tackle challenges." },
      { title: "Analytical Thinking", description: "You break big problems into clear, logical steps." },
      { title: "Empathy", description: "You understand what people need and care about helping them." },
    ],
    top_careers: [
      { name: "UX/UI Designer", match: 91, salary_range: "₹4–18 LPA", education_path: "B.Des / any degree + UX course", description: "Designs easy, beautiful digital experiences for apps and websites." },
      { name: "Product Manager", match: 86, salary_range: "₹8–30 LPA", education_path: "Any degree + business/tech exposure", description: "Decides what a product should do and leads the team building it." },
      { name: "Software Developer", match: 83, salary_range: "₹5–25 LPA", education_path: "B.Tech CSE / BCA", description: "Builds apps, websites, and software systems with code." },
      { name: "Data Analyst", match: 80, salary_range: "₹4–15 LPA", education_path: "Any degree + analytics certification", description: "Turns data into insights that guide decisions." },
      { name: "Architect", match: 76, salary_range: "₹4–20 LPA", education_path: "B.Arch (5 years)", description: "Designs buildings and spaces that are useful and beautiful." },
      { name: "Marketing Specialist", match: 74, salary_range: "₹3–18 LPA", education_path: "BBA / any degree + marketing skills", description: "Helps brands reach and connect with the right people." },
      { name: "Psychologist", match: 71, salary_range: "₹3–12 LPA", education_path: "BA/BSc Psychology → Masters", description: "Helps people understand and improve their mental wellbeing." },
      { name: "Graphic Designer", match: 69, salary_range: "₹3–12 LPA", education_path: "B.Des / design diploma", description: "Creates visual content like logos, posters, and branding." },
      { name: "Entrepreneur", match: 66, salary_range: "Varies widely", education_path: "Any degree + real-world building", description: "Starts and grows their own business or product." },
      { name: "Content Creator", match: 63, salary_range: "₹2–20 LPA", education_path: "Any degree + portfolio", description: "Makes videos, writing, or media for an audience or brand." },
    ],
  };
}