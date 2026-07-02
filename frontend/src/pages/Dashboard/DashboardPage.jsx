import { useNavigate } from "react-router-dom";
import {
  ClipboardList, ArrowRight, Lock, MessageCircle, Compass,
  Sparkles, TrendingUp, Target,
} from "lucide-react";
import { getUser, hasReport } from "../../services/userService";

export default function DashboardPage() {
  const navigate = useNavigate();
  const user = getUser();
  const reportReady = hasReport();
  const firstName = (user?.name || "there").split(" ")[0];

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-brand-blue sm:text-3xl">
          Hi, {firstName} 👋
        </h1>
        <p className="mt-1 text-slate-500">
          {reportReady
            ? "Here's your career clarity at a glance."
            : "Let's discover the careers that fit you best."}
        </p>
      </div>

      {/* Hero: CTA (no report) OR Clarity Score (report ready) */}
      {!reportReady ? (
        <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-brand-blue to-brand-indigo p-8 text-white sm:p-10">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
              <Sparkles className="h-3.5 w-3.5" />
              Your journey starts here
            </span>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              Take your Career Assessment to unlock your report
            </h2>
            <p className="mt-3 text-blue-100">
              Answer 20 quick questions and our AI will build your Career DNA —
              your top 10 career matches, strengths, and Clarity Score.
            </p>
            <button
              onClick={() => navigate("/assessment")}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
            >
              <ClipboardList className="h-5 w-5" />
              Take Assessment
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-3 text-sm text-blue-200">Takes about 10–15 minutes</p>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-10">
            {/* Score circle */}
            <div className="relative flex h-40 w-40 items-center justify-center">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="44" fill="none" stroke="#E2E8F0" strokeWidth="10" />
                <circle
                  cx="50" cy="50" r="44" fill="none" stroke="#0D9488" strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${(user.report.clarity_score / 100) * 276} 276`}
                />
              </svg>
              <div className="absolute text-center">
                <p className="text-4xl font-extrabold text-brand-blue">
                  {user.report.clarity_score}
                </p>
                <p className="text-xs text-slate-400">/ 100</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-accent-teal">
                Your Clarity Score
              </p>
              <h2 className="mt-1 text-2xl font-bold text-brand-blue">
                You're on the right track!
              </h2>
              <p className="mt-2 max-w-md text-slate-500">
                Your report is ready. Explore your top career matches and start
                tasting careers that fit you.
              </p>
              <button
                onClick={() => navigate("/report")}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-indigo"
              >
                View Full Report
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: Target, label: "Clarity Score", value: reportReady ? user.report.clarity_score : "—" },
          { icon: TrendingUp, label: "Careers Explored", value: 0 },
          { icon: ClipboardList, label: "Assessment", value: reportReady ? "Done" : "Pending" },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-offwhite text-brand-blue">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-brand-blue">{value}</p>
              <p className="text-sm text-slate-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h3 className="mb-4 text-lg font-bold text-brand-blue">Quick Actions</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {/* AI Chat — always available */}
          <button
            onClick={() => navigate("/chat")}
            className="flex items-center gap-4 rounded-2xl bg-white p-5 text-left shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-accent-teal">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold text-brand-blue">Ask AI Mentor</p>
              <p className="text-sm text-slate-500">Career questions, 24/7 chat with AI Mentor</p>
            </div>
          </button>

          {/* Explore Careers — locked until report */}
          <button
            onClick={() => reportReady && navigate("/careers")}
            disabled={!reportReady}
            className={`flex items-center gap-4 rounded-2xl p-5 text-left shadow-sm transition-shadow ${
              reportReady ? "bg-white hover:shadow-md" : "cursor-not-allowed bg-slate-50"
            }`}
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${
              reportReady ? "bg-orange-50 text-accent-orange" : "bg-slate-200 text-slate-400"
            }`}>
              {reportReady ? <Compass className="h-6 w-6" /> : <Lock className="h-6 w-6" />}
            </div>
            <div>
              <p className={`font-semibold ${reportReady ? "text-brand-blue" : "text-slate-400"}`}>
                Explore Careers
              </p>
              <p className="text-sm text-slate-400">
                {reportReady ? "Browse your top matches" : "Unlocks after your assessment"}
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}