import { useNavigate } from "react-router-dom";
import {
  Sparkles, Share2, ArrowRight, Lightbulb, Trophy,
} from "lucide-react";
import { getUser } from "../../services/userService";
import ClarityScoreRing from "../../components/report/ClarityScoreRing";
import CareerMatchCard from "../../components/report/CareerMatchCard";

export default function ReportPage() {
  const navigate = useNavigate();
  const user = getUser();
  const report = user?.report;
  const firstName = (user?.name || "there").split(" ")[0];

  // No report yet → nudge to assessment
  if (!report) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="text-xl font-bold text-brand-blue">No report yet</h1>
        <p className="mt-2 text-slate-500">
          Take your career assessment to unlock your Clarity Report.
        </p>
        <button
          onClick={() => navigate("/assessment")}
          className="mt-6 rounded-lg bg-accent-orange px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600"
        >
          Take Assessment
        </button>
      </div>
    );
  }

  const topCareer = report.top_careers?.[0];

  const handleShare = () => {
    const lines = report.top_careers
      .slice(0, 3)
      .map((c, i) => `${i + 1}. ${c.name} (${c.match}%)`)
      .join("\n");
    const text = `🎯 My Career Clarity Report — Next Move\n\nClarity Score: ${report.clarity_score}/100\n\nMy top career matches:\n${lines}\n\nFind your career clarity too!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wide text-accent-teal">
            Your Career DNA
          </span>
          <h1 className="mt-1 text-2xl font-bold text-brand-blue sm:text-3xl">
            {firstName}'s Career Clarity Report
          </h1>
        </div>
        <button
          onClick={handleShare}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
        >
          <Share2 className="h-4 w-4" />
          Share with Parents
        </button>
      </div>

      {/* DNA summary */}
      <div className="rounded-2xl border border-brand-indigo/10 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 text-brand-indigo">
          <Sparkles className="h-5 w-5" />
          <h2 className="font-bold">Who You Are</h2>
        </div>
        <p className="mt-3 leading-relaxed text-slate-600">{report.dna_summary}</p>
      </div>

      {/* Score + Strengths */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Clarity Score */}
        <div className="flex items-center gap-6 rounded-2xl bg-white p-6 shadow-sm">
          <ClarityScoreRing score={report.clarity_score} size={140} />
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-accent-teal">
              Clarity Score
            </p>
            <h2 className="mt-1 text-lg font-bold text-brand-blue">
              {report.clarity_score >= 75
                ? "You have strong direction!"
                : report.clarity_score >= 50
                ? "You're getting clearer."
                : "Let's build your clarity."}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              This shows how clear your career direction is right now.
            </p>
          </div>
        </div>

        {/* Strengths */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-brand-blue">
            <Trophy className="h-5 w-5 text-accent-orange" />
            <h2 className="font-bold">Your Top Strengths</h2>
          </div>
          <ul className="mt-4 space-y-3">
            {report.strengths?.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-orange-50 text-xs font-bold text-accent-orange">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-brand-blue">{s.title}</p>
                  <p className="text-sm text-slate-500">{s.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommended next step */}
      {topCareer && (
        <div className="flex flex-col items-start gap-4 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-indigo p-6 text-white sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <Lightbulb className="mt-0.5 h-6 w-6 flex-shrink-0 text-accent-orange" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-200">
                Recommended Next Step
              </p>
              <p className="mt-1 font-semibold">
                Taste your #1 match — {topCareer.name} — to see if it really fits.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/career/0")}
            className="inline-flex flex-shrink-0 items-center gap-2 rounded-lg bg-accent-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
          >
            Taste This Career
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Top 10 career matches */}
      <div>
        <h2 className="mb-4 text-lg font-bold text-brand-blue">
          Your Top 10 Career Matches
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {report.top_careers?.map((career, i) => (
            <CareerMatchCard
              key={i}
              rank={i + 1}
              career={career}
              onClick={() => navigate(`/career/${i}`)}
            />
          ))}
        </div>
      </div>

      {/* PDF note (deferred) */}
      <p className="text-center text-xs text-slate-400">
        PDF download &amp; parent link coming soon.
      </p>
    </div>
  );
}