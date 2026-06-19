import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  X, Play, ArrowRight, Brain, Trophy, CheckCircle2, Sparkles,
} from "lucide-react";
import { getCareerByIndex } from "../../services/careerService";
import { getScenarios, getDebrief, saveTasteToPortfolio } from "../../services/tasteService";
import OptionCard from "../../components/ui/OptionCard";

export default function CareerTastePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const career = getCareerByIndex(id);

  const [phase, setPhase] = useState("loading"); // loading | intro | playing | debriefing | debrief | error
  const [taste, setTaste] = useState(null);
  const [index, setIndex] = useState(0);
  const [choices, setChoices] = useState([]);
  const [selected, setSelected] = useState(null);
  const [debrief, setDebrief] = useState(null);
  const savedRef = useRef(false);

  // Load scenarios
  useEffect(() => {
    if (!career) return;
    let active = true;
    getScenarios(career)
      .then((t) => { if (active) { setTaste(t); setPhase("intro"); } })
      .catch(() => active && setPhase("error"));
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Save to portfolio once when debrief is shown
  useEffect(() => {
    if (phase === "debrief" && debrief && !savedRef.current) {
      savedRef.current = true;
      saveTasteToPortfolio(career, debrief);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, debrief]);

  if (!career) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-offwhite text-center">
        <h1 className="text-xl font-bold text-brand-blue">Career not found</h1>
        <button onClick={() => navigate("/report")} className="mt-4 rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white">
          Back to Report
        </button>
      </div>
    );
  }

  const scenarios = taste?.scenarios || [];
  const total = scenarios.length;
  const current = scenarios[index];

  const handleSelect = (opt) => {
    setSelected(opt.id);
    const record = { situation: current.situation, chosen_id: opt.id, chosen_text: opt.text };
    const updated = [...choices, record];
    setChoices(updated);

    setTimeout(() => {
      setSelected(null);
      if (index < total - 1) {
        setIndex((i) => i + 1);
      } else {
        runDebrief(updated);
      }
    }, 320);
  };

  const runDebrief = async (finalChoices) => {
    setPhase("debriefing");
    try {
      const d = await getDebrief(career, finalChoices);
      setDebrief(d);
      setPhase("debrief");
    } catch {
      setPhase("error");
    }
  };

  // ── LOADING ──
  if (phase === "loading" || phase === "debriefing") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-brand-blue to-brand-indigo px-6 text-center">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/20" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/95">
            <Brain className="h-8 w-8 text-brand-indigo" />
          </div>
        </div>
        <p className="mt-8 text-lg font-semibold text-white">
          {phase === "loading" ? `Setting up your ${career.name} simulation…` : "Analysing your choices…"}
        </p>
      </div>
    );
  }

  // ── ERROR ──
  if (phase === "error") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-offwhite px-6 text-center">
        <h1 className="text-xl font-bold text-brand-blue">Something went wrong</h1>
        <p className="mt-2 text-slate-500">We couldn't load the simulation. Make sure the backend is running.</p>
        <button onClick={() => navigate(`/career/${id}`)} className="mt-6 rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white">
          Back to Career
        </button>
      </div>
    );
  }

  // ── INTRO ──
  if (phase === "intro") {
    return (
      <div className="flex min-h-screen flex-col bg-offwhite">
        <TasteHeader onExit={() => navigate(`/career/${id}`)} />
        <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-blue text-white">
            <Sparkles className="h-8 w-8" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-brand-blue sm:text-3xl">
            Taste the life of a {career.name}
          </h1>
          <p className="mt-3 text-slate-600">{taste.intro}</p>
          <p className="mt-2 text-sm text-slate-400">5 quick situations · about 5 minutes</p>
          <button
            onClick={() => setPhase("playing")}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent-orange px-8 py-3.5 text-sm font-semibold text-white hover:bg-orange-600"
          >
            <Play className="h-4 w-4" />
            Start Simulation
          </button>
        </div>
      </div>
    );
  }

  // ── DEBRIEF ──
  if (phase === "debrief") {
    return (
      <div className="flex min-h-screen flex-col bg-offwhite">
        <TasteHeader onExit={() => navigate(`/career/${id}`)} />
        <div className="mx-auto w-full max-w-xl flex-1 px-4 py-10">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-accent-orange">
              <Trophy className="h-8 w-8" />
            </div>
            <h1 className="mt-5 text-2xl font-bold text-brand-blue sm:text-3xl">
              {debrief.headline}
            </h1>
            <p className="mt-3 text-slate-600">{debrief.summary}</p>
          </div>

          <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="font-bold text-brand-blue">What real {career.name}s do</h2>
            <ul className="mt-4 space-y-3">
              {debrief.insights?.map((item, i) => (
                <li key={i} className="flex gap-3 text-slate-600">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-teal" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 rounded-2xl border border-accent-teal/20 bg-teal-50/40 p-6">
            <p className="font-semibold text-accent-teal">Is it a fit?</p>
            <p className="mt-1 text-slate-600">{debrief.fit_note}</p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => navigate("/report")}
              className="flex-1 rounded-lg bg-brand-blue px-6 py-3 text-sm font-semibold text-white hover:bg-brand-indigo"
            >
              Explore More Careers
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="flex-1 rounded-lg border border-slate-200 px-6 py-3 text-sm font-semibold text-brand-blue hover:bg-white"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── PLAYING ──
  const progress = ((index + 1) / total) * 100;
  return (
    <div className="flex min-h-screen flex-col bg-offwhite">
      {/* Header with progress */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-2xl items-center gap-4 px-4 py-4">
          <div className="flex-1">
            <div className="mb-1.5 flex justify-between text-xs font-medium text-slate-500">
              <span>{career.name} Simulation</span>
              <span>{index + 1} of {total}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-accent-teal transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <button onClick={() => navigate(`/career/${id}`)} className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-offwhite hover:text-brand-blue">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Scenario */}
      <div className="flex flex-1 items-center">
        <div className="mx-auto w-full max-w-2xl px-4 py-8">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent-teal">
            Situation {index + 1}
          </span>
          <h1 className="mt-2 text-xl font-bold text-brand-blue sm:text-2xl">
            {current.situation}
          </h1>
          <div className="mt-8 space-y-3">
            {current.options.map((opt) => (
              <OptionCard
                key={opt.id}
                label={opt.text}
                selected={selected === opt.id}
                onClick={() => handleSelect(opt)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Shared minimal header for intro/debrief
function TasteHeader({ onExit }) {
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
        <span className="text-sm font-semibold text-brand-blue">Career Taste</span>
        <button onClick={onExit} className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-offwhite hover:text-brand-blue">
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}