import { useState, useEffect, useRef } from "react";
import { Send, Bot, Trash2, Sparkles } from "lucide-react";
import { loadHistory, saveHistory, clearHistory, sendMessage } from "../../services/chatService";

const starters = [
  "Which stream should I choose after Class 10?",
  "UX design mein kitni salary milti hai?",
  "Tell me about my top career match",
  "Science vs Commerce — which is better for me?",
];

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const endRef = useRef(null);

  // Load saved history once
  useEffect(() => {
    setMessages(loadHistory());
  }, []);

  // Persist + auto-scroll on any change
  useEffect(() => {
    saveHistory(messages);
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sending]);

  const send = async (text) => {
    const content = (text ?? input).trim();
    if (!content || sending) return;

    const userMsg = { role: "user", content };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setSending(true);

    try {
      const reply = await sendMessage(updated);
      setMessages([...updated, { role: "assistant", content: reply }]);
    } catch {
      setMessages([
        ...updated,
        { role: "assistant", content: "Sorry, I couldn't reach the server. Please make sure the backend is running and try again." },
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const handleClear = () => {
    clearHistory();
    setMessages([]);
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="mx-auto flex h-[calc(100vh-7rem)] max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue text-white">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold text-brand-blue">AI Career Mentor</p>
            <p className="flex items-center gap-1 text-xs text-accent-teal">
              <span className="h-2 w-2 rounded-full bg-accent-teal" />
              Online 
            </p>
          </div>
        </div>
        {!isEmpty && (
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-400 hover:bg-offwhite hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-offwhite px-4 py-5">
        {isEmpty ? (
          // Empty state with starters
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-blue text-white">
              <Sparkles className="h-8 w-8" />
            </div>
            <h2 className="mt-5 text-lg font-bold text-brand-blue">
              Ask me anything about your career
            </h2>
            <p className="mt-1 max-w-sm text-sm text-slate-500">
              Salaries, streams, colleges, or your own report
            </p>
            <div className="mt-6 grid w-full max-w-md gap-2 sm:grid-cols-2">
              {starters.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm text-slate-600 transition-colors hover:border-brand-indigo/40 hover:text-brand-blue"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((m, i) => (
              <MessageBubble key={i} role={m.role} content={m.content} />
            ))}
            {sending && <TypingIndicator />}
            <div ref={endRef} />
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="border-t border-slate-100 bg-white px-4 py-3">
        <div className="flex items-end gap-2">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your question…"
            className="max-h-32 flex-1 resize-none rounded-xl border border-slate-200 bg-offwhite px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-brand-indigo focus:ring-1 focus:ring-brand-indigo"
          />
          <button
            onClick={() => send()}
            disabled={!input.trim() || sending}
            className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-white transition-colors ${
              input.trim() && !sending
                ? "bg-accent-orange hover:bg-orange-600"
                : "cursor-not-allowed bg-slate-300"
            }`}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ──
function MessageBubble({ role, content }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="mr-2 mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-blue text-white">
          <Bot className="h-4 w-4" />
        </div>
      )}
      <div
        className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "rounded-br-sm bg-brand-blue text-white"
            : "rounded-bl-sm border border-slate-100 bg-white text-slate-700"
        }`}
      >
        {content}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="mr-2 mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-blue text-white">
        <Bot className="h-4 w-4" />
      </div>
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-slate-100 bg-white px-4 py-3">
        <span className="h-2 w-2 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.3s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.15s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-slate-300" />
      </div>
    </div>
  );
}