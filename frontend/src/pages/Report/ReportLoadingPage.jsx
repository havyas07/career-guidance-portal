import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, AlertCircle, RefreshCw } from "lucide-react";
import { generateReport } from "../../services/reportService";

const messages = [
  "Reading your answers…",
  "Analysing your interests & strengths…",
  "Building your Career DNA…",
  "Matching you with 5,000+ careers…",
  "Calculating your Clarity Score…",
  "Almost there — finishing your report…",
];

export default function ReportLoadingPage() {
  const navigate = useNavigate();
  const [msgIndex, setMsgIndex] = useState(0);
  const [error, setError] = useState(false);
  const started = useRef(false);

  // Cycle the loading messages
  useEffect(() => {
    const t = setInterval(
      () => setMsgIndex((i) => (i < messages.length - 1 ? i + 1 : i)),
      1800
    );
    return () => clearInterval(t);
  }, []);

  // Kick off generation once
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const run = async () => {
    setError(false);
    setMsgIndex(0);
    const start = Date.now();
    try {
      await generateReport();
      // keep the animation up at least 3s so it feels substantial
      const wait = Math.max(0, 3000 - (Date.now() - start));
      setTimeout(() => navigate("/report"), wait);
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  // ── Error state ──
  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-offwhite px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-xl font-bold text-brand-blue">
          Couldn't build your report
        </h1>
        <p className="mt-2 max-w-sm text-slate-500">
          We couldn't reach the report service. Make sure the backend is running,
          then try again.
        </p>
        <button
          onClick={run}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent-orange px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-3 text-sm text-slate-400 hover:text-brand-blue"
        >
          Back to dashboard
        </button>
      </div>
    );
  }

  // ── Loading state ──
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-brand-blue to-brand-indigo px-6 text-center">
      {/* Pulsing AI orb */}
      <div className="relative flex h-32 w-32 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/20" />
        <span className="absolute inline-flex h-24 w-24 animate-pulse rounded-full bg-white/10" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-lg">
          <Brain className="h-10 w-10 text-brand-indigo" />
        </div>
      </div>

      <h1 className="mt-10 text-2xl font-bold text-white sm:text-3xl">
        Building your Career DNA
      </h1>

      {/* Cycling message */}
      <p className="mt-3 h-6 text-blue-100 transition-all">
        {messages[msgIndex]}
      </p>

      {/* Progress bar */}
      <div className="mt-8 h-2 w-full max-w-xs overflow-hidden rounded-full bg-white/20">
        <div
          className="h-full rounded-full bg-accent-teal transition-all duration-700"
          style={{ width: `${((msgIndex + 1) / messages.length) * 100}%` }}
        />
      </div>

      <p className="mt-6 text-sm text-blue-200">
        This usually takes 20–30 seconds. Hang tight!
      </p>
    </div>
  );
}