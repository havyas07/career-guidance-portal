import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import Button from "../ui/Button";

export default function LandingFooter() {
  return (
    <footer id="about" className="bg-white">
      {/* Final CTA band */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-brand-blue px-6 py-14 text-center sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold text-white sm:text-4xl">
            Your future deserves more than a guess.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-blue-100">
            Join thousands of students discovering careers that truly fit them.
            Start free today.
          </p>
          <div className="mt-8 flex justify-center">
            <Button to="/register" variant="accent" className="px-8 py-3.5 text-base">
              Get Started Free
            </Button>
          </div>
        </div>
      </div>

      {/* Footer links */}
      <div className="border-t border-slate-100">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-brand-blue" />
            <span className="text-lg font-bold text-brand-blue">Next Move</span>
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
            <a href="#how-it-works" className="hover:text-brand-blue">How it Works</a>
            <a href="#features" className="hover:text-brand-blue">Features</a>
            <Link to="/login" className="hover:text-brand-blue">Login</Link>
            <Link to="/register" className="hover:text-brand-blue">Sign Up</Link>
          </div>

          <p className="text-sm text-slate-400">
            © 2026 Next Move. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}