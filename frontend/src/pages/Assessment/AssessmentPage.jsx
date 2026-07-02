import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, RotateCcw, X } from "lucide-react";
import questions from "../../data/assessmentQuestions";
import OptionCard from "../../components/ui/OptionCard";
import {
  saveProgress, loadProgress, submitAssessment,
} from "../../services/assessmentService";

export default function AssessmentPage() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Resume from saved progress on first load
  useEffect(() => {
    const saved = loadProgress();
    if (saved) {
      setAnswers(saved.answers || {});
      setIndex(saved.currentIndex || 0);
    }
  }, []);

  const total = questions.length;
  const current = questions[index];
  const selected = answers[current.id];
  const isLast = index === total - 1;
  const progress = ((index + 1) / total) * 100;

  const handleSelect = (value) => {
    const updated = { ...answers, [current.id]: value };
    setAnswers(updated);
    saveProgress(updated, index); // autosave immediately

    // brief pause so the selection is visible, then auto-advance
    setTimeout(() => {
      if (isLast) {
        handleSubmit(updated);
      } else {
        const nextIndex = index + 1;
        setIndex(nextIndex);
        saveProgress(updated, nextIndex);
      }
    }, 280);
  };

  const goBack = () => {
    if (index === 0) return;
    const prevIndex = index - 1;
    setIndex(prevIndex);
    saveProgress(answers, prevIndex);
  };

  const handleClear = () => {
    const updated = { ...answers };
    delete updated[current.id];
    setAnswers(updated);
    saveProgress(updated, index);
  };

  const handleSubmit = async (finalAnswers) => {
    setSubmitting(true);
    await submitAssessment(finalAnswers);
    navigate("/report-loading");
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-offwhite">
      {/* Header: progress + exit */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-2xl items-center gap-4 px-4 py-4">
          <div className="flex-1">
            <div className="mb-1.5 flex justify-between text-xs font-medium text-slate-500">
              <span>Career Assessment</span>
              <span>{index + 1} of {total}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-accent-teal transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-offwhite hover:text-brand-blue"
            title="Save & exit"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Question body */}
      <div className="flex flex-1 items-center overflow-y-auto">
        <div className="mx-auto w-full max-w-2xl px-4 py-8">
          <h1 className="text-2xl font-bold text-brand-blue sm:text-3xl">
            {current.text}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Tap an option to continue.
          </p>

          <div className="mt-8 space-y-3">
            {current.options.map((opt) => (
              <OptionCard
                key={opt.value}
                label={opt.label}
                selected={selected === opt.value}
                onClick={() => handleSelect(opt.value)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer: back / clear (no Next — selecting auto-advances) */}
      <div className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
          <button
            onClick={goBack}
            disabled={index === 0 || submitting}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
              index === 0 || submitting
                ? "cursor-not-allowed text-slate-300"
                : "text-brand-blue hover:bg-offwhite"
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </button>

          <button
            onClick={handleClear}
            disabled={!selected || submitting}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
              !selected || submitting
                ? "cursor-not-allowed text-slate-300"
                : "text-brand-blue hover:bg-offwhite"
            }`}
          >
            <RotateCcw className="h-4 w-4" />
            Clear
          </button>
        </div>
      </div>

      {/* Submitting overlay (last question → building report) */}
      {submitting && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur-sm">
          <p className="text-sm font-semibold text-brand-blue">
            Building your report…
          </p>
        </div>
      )}
    </div>
  );
}