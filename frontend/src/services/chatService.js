import api from "./api";
import { getUser } from "./userService";

const HISTORY_KEY = "nextmove_chat_history";

export function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveHistory(messages) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(messages));
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}

// Send the full conversation; backend adds the system prompt + student context.
export async function sendMessage(messages) {
  const user = getUser();
  const student = user
    ? {
        name: user.name,
        class_grade: user.class_grade,
        city: user.city,
        report: user.report || null,
      }
    : null;

  const { data } = await api.post("/chat/message", { messages, student });
  return data.reply;
}