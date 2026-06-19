import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import Button from "../ui/Button";

export default function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-brand-blue" />
          <span className="text-xl font-bold tracking-tight text-brand-blue">
            Next Move
          </span>
        </Link>

        {/* Center links (hidden on mobile) */}
        <div className="hidden items-center gap-8 md:flex">
          <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-brand-blue">
            How it Works
          </a>
          <a href="#features" className="text-sm font-medium text-slate-600 hover:text-brand-blue">
            Features
          </a>
          <a href="#about" className="text-sm font-medium text-slate-600 hover:text-brand-blue">
            About
          </a>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden text-sm font-semibold text-brand-blue hover:text-brand-indigo sm:block"
          >
            Login
          </Link>
          <Button to="/register" variant="accent" className="px-4 py-2 sm:px-6 sm:py-2.5">
            Get Started
          </Button>
        </div>
      </nav>
    </header>
  );
}