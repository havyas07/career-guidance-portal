import Button from "../ui/Button";
import { Sparkles, ArrowRight } from "lucide-react";

export default function LandingHero() {
  return (
    <section className="bg-offwhite">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
        {/* Left: message */}
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-1.5 text-sm font-medium text-accent-teal">
            <Sparkles className="h-4 w-4" />
            AI Career Clarity Platform
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-brand-blue sm:text-5xl lg:text-6xl">
            Stop guessing your{" "}
            <span className="text-accent-orange">future</span>.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600 lg:mx-0">
            Every year, 25 million Indian students guess their career. Next Move
            gives you a personal AI guide that understands you, shows careers
            that fit, and builds a clear roadmap — starting at just ₹299/month.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start">
            <Button to="/register" variant="accent" className="w-full sm:w-auto">
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button to="/login" variant="outline" className="w-full sm:w-auto">
              I already have an account
            </Button>
          </div>

          <p className="mt-4 text-sm text-slate-400">
            No counsellor needed · Built for Class 10 & 12 students
          </p>
        </div>

        {/* Right: visual placeholder */}
        <div className="relative">
          <div className="mx-auto flex aspect-square w-full max-w-md items-center justify-center rounded-3xl bg-gradient-to-br from-brand-blue to-brand-indigo p-8 shadow-xl">
            <div className="w-full rounded-2xl bg-white/95 p-6 shadow-lg">
              <p className="text-sm font-medium text-slate-400">Your Clarity Score</p>
              <p className="mt-1 text-5xl font-extrabold text-brand-blue">87<span className="text-2xl text-slate-300">/100</span></p>
              <div className="mt-4 h-2 w-full rounded-full bg-slate-100">
                <div className="h-2 w-[87%] rounded-full bg-accent-teal" />
              </div>
              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between rounded-lg bg-offwhite px-3 py-2">
                  <span className="text-sm font-medium text-slate-700">UX Designer</span>
                  <span className="text-sm font-bold text-accent-teal">91%</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-offwhite px-3 py-2">
                  <span className="text-sm font-medium text-slate-700">Product Manager</span>
                  <span className="text-sm font-bold text-accent-teal">84%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}