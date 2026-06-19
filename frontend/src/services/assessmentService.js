const PROGRESS_KEY = "nextmove_assessment_progress";

// ── Autosave / resume ──
export function saveProgress(answers, currentIndex) {
  localStorage.setItem(
    PROGRESS_KEY,
    JSON.stringify({ answers, currentIndex, savedAt: Date.now() })
  );
}

export function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || null;
  } catch {
    return null;
  }
}

export function clearProgress() {
  localStorage.removeItem(PROGRESS_KEY);
}

// ── Submit ──
// MOCK for now. Later: POST /api/assessment/submit → triggers AI report.
export async function submitAssessment(answers) {
  await new Promise((r) => setTimeout(r, 600));

  // Save raw answers onto the user so the report screen can use them.
  const user = JSON.parse(localStorage.getItem("nextmove_user") || "{}");
  user.assessmentAnswers = answers;
  user.assessmentCompletedAt = Date.now();
  localStorage.setItem("nextmove_user", JSON.stringify(user));

  clearProgress();
  return { success: true };
}