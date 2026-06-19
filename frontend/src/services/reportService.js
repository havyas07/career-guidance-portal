import api from "./api";
import questions from "../data/assessmentQuestions";

// Turn { q1: "build" } into readable [{ question, answer }] for the AI.
function buildReadableAnswers(rawAnswers) {
  return questions.map((q) => {
    const opt = q.options.find((o) => o.value === rawAnswers[q.id]);
    return { question: q.text, answer: opt ? opt.label : "Not answered" };
  });
}

export async function generateReport() {
  const user = JSON.parse(localStorage.getItem("nextmove_user") || "{}");
  const answers = buildReadableAnswers(user.assessmentAnswers || {});

  const { data } = await api.post("/report/generate", {
    name: user.name,
    class_grade: user.class_grade,
    city: user.city,
    answers,
  });

  // Persist the report onto the user (Dashboard + Report screen read this).
  user.report = data.report;
  localStorage.setItem("nextmove_user", JSON.stringify(user));
  return data.report;
}