import { cohere, isAIEnabled, MODEL } from "../config/ai.js";
import { safeJsonParse } from "../utils/json.js";

// ── 1. Generate the 5 scenario questions ──
export async function generateScenarios(req, res) {
  const { career, studentName, class_grade } = req.body;
  if (!career || !career.name) {
    return res.status(400).json({ error: "career is required" });
  }

  if (!isAIEnabled) {
    console.warn("[Next Move] No COHERE_API_KEY — returning MOCK taste scenarios.");
    return res.json({ taste: mockScenarios(career), mock: true });
  }

  try {
    const taste = await buildScenariosWithAI({ career, studentName, class_grade });
    return res.json({ taste, mock: false });
  } catch (err) {
    console.error("Cohere error:", err.message);
    console.warn("[Next Move] Falling back to MOCK taste scenarios.");
    return res.json({ taste: mockScenarios(career), mock: true });
  }
}

// ── 2. Generate the debrief from the student's choices ──
export async function generateDebrief(req, res) {
  const { career, choices } = req.body;
  if (!career || !career.name) {
    return res.status(400).json({ error: "career is required" });
  }

  if (!isAIEnabled) {
    console.warn("[Next Move] No COHERE_API_KEY — returning MOCK debrief.");
    return res.json({ debrief: mockDebrief(career), mock: true });
  }

  try {
    const debrief = await buildDebriefWithAI({ career, choices });
    return res.json({ debrief, mock: false });
  } catch (err) {
    console.error("Cohere error:", err.message);
    console.warn("[Next Move] Falling back to MOCK debrief.");
    return res.json({ debrief: mockDebrief(career), mock: true });
  }
}

// ── AI builders ──
async function buildScenariosWithAI({ career, studentName, class_grade }) {
  const systemPrompt = `You design short, fun career-simulation games for Indian students in Class 10 and 12.
Create a 5-scenario "day in the life" simulation for a given career. Each scenario is a realistic workplace
situation with exactly 3 plausible choices (no obviously wrong/joke options). Keep language simple and engaging.
Respond with ONLY valid JSON — no markdown — in this exact shape:
{
  "intro": "1-2 sentence setup: 'You are a ... at ...'",
  "scenarios": [
    {
      "situation": "the situation as a question",
      "options": [
        { "id": "a", "text": "choice text" },
        { "id": "b", "text": "choice text" },
        { "id": "c", "text": "choice text" }
      ]
    }
  ]
}
Exactly 5 scenarios.`;

  const userPrompt = `Career: ${career.name}. ${career.description || ""}
Student: ${studentName || "a student"}, Class ${class_grade || "?"}.
Generate the 5-scenario simulation JSON now.`;

  const response = await cohere.chat({
    model: MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });
  return safeJsonParse(response.message.content[0].text);
}

async function buildDebriefWithAI({ career, choices }) {
  const choicesText = (choices || [])
    .map((c, i) => `${i + 1}. ${c.situation}\n   Chose: ${c.chosen_text}`)
    .join("\n");

  const systemPrompt = `You are an encouraging career mentor for Indian students.
A student just completed a 5-scenario simulation for a career. Based on their choices, write a short, positive
debrief that helps them feel what the career is really like and whether it suits them. Be warm and specific.
Respond with ONLY valid JSON — no markdown — in this exact shape:
{
  "headline": "fun one-line verdict, e.g. 'You think like a real designer!'",
  "summary": "2-3 sentences about how they approached the scenarios",
  "insights": ["3 short points about what real professionals in this career do"],
  "fit_note": "1-2 encouraging sentences on whether this career might suit them"
}`;

  const userPrompt = `Career: ${career.name}.
The student's choices:
${choicesText}

Generate the debrief JSON now.`;

  const response = await cohere.chat({
    model: MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });
  return safeJsonParse(response.message.content[0].text);
}

// ── Mock fallbacks ──
function mockScenarios(career) {
  const name = career.name;
  return {
    intro: `You're a ${name} at a fast-growing company. Here are 5 real situations — make the call you think is best!`,
    scenarios: [
      {
        situation: `Your manager hands you a new project with a tight deadline. How do you start?`,
        options: [
          { id: "a", text: "Jump straight in and start working" },
          { id: "b", text: "Make a clear plan and list the steps first" },
          { id: "c", text: "Ask the team to brainstorm together" },
        ],
      },
      {
        situation: `Halfway through, you realise your first approach isn't working. What now?`,
        options: [
          { id: "a", text: "Push harder with the same approach" },
          { id: "b", text: "Step back and try a fresh approach" },
          { id: "c", text: "Ask a senior colleague for advice" },
        ],
      },
      {
        situation: `A teammate disagrees with your idea in a meeting. You…`,
        options: [
          { id: "a", text: "Defend your idea firmly" },
          { id: "b", text: "Listen, then find a middle ground" },
          { id: "c", text: "Ask others what they think too" },
        ],
      },
      {
        situation: `You get feedback that your work needs big changes. Your reaction?`,
        options: [
          { id: "a", text: "Feel discouraged but make the changes" },
          { id: "b", text: "See it as a chance to improve and dig in" },
          { id: "c", text: "Ask for examples so you understand better" },
        ],
      },
      {
        situation: `The project succeeds! How do you celebrate the win?`,
        options: [
          { id: "a", text: "Quietly feel proud and move to the next task" },
          { id: "b", text: "Share credit with the whole team" },
          { id: "c", text: "Reflect on what you learned for next time" },
        ],
      },
    ],
  };
}

function mockDebrief(career) {
  return {
    headline: `You've got the instincts of a ${career.name}!`,
    summary: `You approached each situation thoughtfully — balancing planning, teamwork, and a willingness to adapt. That mix is exactly what this career rewards.`,
    insights: [
      `Real ${career.name}s plan before they dive in, but stay flexible when things change.`,
      "They treat feedback as fuel, not failure.",
      "They know the best results usually come from working well with others.",
    ],
    fit_note: `Based on how you handled these, this career could be a strong fit for you. Keep exploring it!`,
  };
}