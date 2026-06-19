import api from "./api";
import { getUser } from "./userService";

const cacheKey = (name) => `nextmove_career_detail_${name}`;

// Read one career from the saved report by its index.
export function getCareerByIndex(index) {
  const careers = getUser()?.report?.top_careers || [];
  return careers[Number(index)] || null;
}

// Fetch AI deep-dive (cached per career to avoid repeat calls).
export async function getCareerDetail(career) {
  try {
    const cached = localStorage.getItem(cacheKey(career.name));
    if (cached) return JSON.parse(cached);
  } catch {
    /* ignore */
  }

  const user = getUser();
  const { data } = await api.post("/career/detail", {
    career,
    studentName: user?.name,
    class_grade: user?.class_grade,
    strengths: user?.report?.strengths || [],
  });

  try {
    localStorage.setItem(cacheKey(career.name), JSON.stringify(data.detail));
  } catch {
    /* ignore */
  }
  return data.detail;
}