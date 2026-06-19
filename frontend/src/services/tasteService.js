import api from "./api";
import { getUser } from "./userService";

const scenarioCacheKey = (name) => `nextmove_taste_${name}`;

// Fetch the 5 scenarios (cached per career).
export async function getScenarios(career) {
  try {
    const cached = localStorage.getItem(scenarioCacheKey(career.name));
    if (cached) return JSON.parse(cached);
  } catch {
    /* ignore */
  }

  const user = getUser();
  const { data } = await api.post("/taste/scenarios", {
    career,
    studentName: user?.name,
    class_grade: user?.class_grade,
  });

  try {
    localStorage.setItem(scenarioCacheKey(career.name), JSON.stringify(data.taste));
  } catch {
    /* ignore */
  }
  return data.taste;
}

// Fetch the debrief from the student's choices (always fresh).
export async function getDebrief(career, choices) {
  const { data } = await api.post("/taste/debrief", { career, choices });
  return data.debrief;
}

// Save a completed taste to the student's portfolio.
export function saveTasteToPortfolio(career, debrief) {
  const user = getUser();
  if (!user) return;
  const portfolio = user.tastePortfolio || [];
  portfolio.push({
    career: career.name,
    headline: debrief.headline,
    completedAt: Date.now(),
  });
  user.tastePortfolio = portfolio;
  localStorage.setItem("nextmove_user", JSON.stringify(user));
}