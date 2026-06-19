import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Code2, Palette, Briefcase, HeartHandshake,
  User, Users, Shuffle,
  HelpCircle, Lightbulb, CheckCircle2,
} from "lucide-react";
import OptionCard from "../../components/ui/OptionCard";

// The 3 quick personalisation questions
const questions = [
  {
    key: "interest",
    title: "Which of these excites you the most?",
    subtitle: "Pick the one that feels most like you.",
    options: [
      { value: "tech", label: "Building & Technology", icon: Code2 },
      { value: "design", label: "Art & Design", icon: Palette },
      { value: "business", label: "Business & Leadership", icon: Briefcase },
      { value: "helping", label: "Helping & Teaching People", icon: HeartHandshake },
    ],
  },
  {
    key: "work_style",
    title: "How do you prefer to work?",
    subtitle: "There's no wrong answer here.",
    options: [
      { value: "alone", label: "On my own", icon: User },
      { value: "team", label: "In a team", icon: Users },
      { value: "mix", label: "A mix of both", icon: Shuffle },
    ],
  },
  {
    key: "clarity_stage",
    title: "Where are you right now?",
    subtitle: "Be honest — it helps us guide you better.",
    options: [
      { value: "confused", label: "Totally confused about my career", icon: HelpCircle },
      { value: "some_ideas", label: "I have a few ideas", icon: Lightbulb },
      { value: "almost_sure", label: "Pretty sure, just want to confirm", icon: CheckCircle2 },
    ],
  },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  // Guard: must be a registered user
  useEffect(() => {
    if (!localStorage.getItem("nextmove_user")) navigate("/register");
  }, [navigate]);

  const current = questions[step];
  const isLast = step === questions.length - 1;

  const handleSelect = (value) => {
    const updated = { ...answers, [current.key]: value };
    setAnswers(updated);

    // brief pause so the selection is visible, then advance
    setTimeout(() => {
      if (isLast) {
        finish(updated);
      } else {
        setStep((s) => s + 1);
      }
    }, 280);
  };

  const finish = (finalAnswers) => {
    // Merge snapshot into the saved user (mock — becomes an API call later)
    const user = JSON.parse(localStorage.getItem("nextmove_user") || "{}");
    user.snapshot = finalAnswers;
    localStorage.setItem("nextmove_user", JSON.stringify(user));
    navigate("/dashboard");
  };

  const goBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const progress = ((step + 1) / questions.length) * 100;

  return (
    <div className="flex min-h-screen flex-col bg-offwhite">
      {/* Top bar: back + progress */}
      <div className="mx-auto w-full max-w-xl px-4 pt-8">
        <div className="flex items-center gap-4">
          <button
            onClick={goBack}
            disabled={step === 0}
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
              step === 0
                ? "cursor-not-allowed text-slate-300"
                : "text-brand-blue hover:bg-white"
            }`}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div className="flex-1">
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-accent-teal transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <span className="text-sm font-semibold text-slate-500">
            {step + 1} of {questions.length}
          </span>
        </div>
      </div>

      {/* Question */}
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-4 py-10">
        <span className="text-sm font-semibold uppercase tracking-wide text-accent-teal">
          Quick Snapshot
        </span>
        <h1 className="mt-2 text-2xl font-bold text-brand-blue sm:text-3xl">
          {current.title}
        </h1>
        <p className="mt-2 text-slate-500">{current.subtitle}</p>

        <div className="mt-8 space-y-3">
          {current.options.map((opt) => (
            <OptionCard
              key={opt.value}
              icon={opt.icon}
              label={opt.label}
              selected={answers[current.key] === opt.value}
              onClick={() => handleSelect(opt.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}