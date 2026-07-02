import { UserPlus, ClipboardList, FileText, MessageSquare } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Sign Up in Minutes",
    description:
      "Create your account with a quick OTP login. Tell us your class, city, and interests — no counsellor needed.",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Take the Assessment",
    description:
      "Answer 20 simple questions about what you enjoy and what you're good at. Our AI builds your Career DNA.",
  },
  {
    number: "03",
    icon: FileText,
    title: "Get Your Clarity Report",
    description:
      "Receive your top 10 career matches, your strengths, and a Clarity Score that shows your direction.",
  },
  {
    number: "04",
    icon: MessageSquare,
    title: "Explore & Ask Anything",
    description:
      "Taste real careers through simulations and chat 24/7 with your AI mentor.",
  },
];

export default function LandingHowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-brand-blue sm:text-4xl">
            From Confusion to Clarity in 4 Steps
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            A simple journey designed for students who have never had a career
            guide before.
          </p>
        </div>

        {/* Steps grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ number, icon: Icon, title, description }) => (
            <div
              key={number}
              className="relative rounded-2xl border border-slate-100 bg-offwhite p-6 transition-shadow hover:shadow-md"
            >
              {/* Faint big number in the background */}
              <span className="absolute right-4 top-2 text-5xl font-extrabold text-slate-100">
                {number}
              </span>

              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue text-white">
                <Icon className="h-6 w-6" />
              </div>

              <h3 className="relative mt-5 text-lg font-bold text-brand-blue">
                {title}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-slate-600">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}