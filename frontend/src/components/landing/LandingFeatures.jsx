import { Compass, Brain, MessageCircle, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Compass,
    accent: "orange",
    title: "Career Tasting",
    description:
      "Experience what a career actually feels like through 5-minute AI-simulated scenarios before you commit.",
  },
  {
    icon: Brain,
    accent: "teal",
    title: "AI Career Mentor",
    description:
      "A personal AI guide with memory that tracks your progress and nudges you toward your next step every week.",
  },
  {
    icon: MessageCircle,
    accent: "orange",
    title: "24/7 AI Chatbot",
    description:
      "Ask anything about careers, salaries, streams, or colleges —  any time of day.",
  },
  {
    icon: BarChart3,
    accent: "teal",
    title: "Career Clarity Report",
    description:
      "A deep, personalised report with your top 10 career matches, strengths, and a 0–100 Clarity Score.",
  },
];

// Map accent name to Tailwind classes (kept explicit so Tailwind detects them)
const accentStyles = {
  orange: "bg-orange-50 text-accent-orange",
  teal: "bg-teal-50 text-accent-teal",
};

export default function LandingFeatures() {
  return (
    <section id="features" className="bg-offwhite py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent-teal">
            What You Get
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-blue sm:text-4xl">
            Everything You Need to Choose with Confidence
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Four powerful tools working together to turn guesswork into a clear,
            data-backed decision.
          </p>
        </div>

        {/* Feature cards */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {features.map(({ icon: Icon, accent, title, description }) => (
            <div
              key={title}
              className="flex gap-5 rounded-2xl bg-white p-7 shadow-sm transition-shadow hover:shadow-md"
            >
              <div
                className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl ${accentStyles[accent]}`}
              >
                <Icon className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-blue">{title}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}