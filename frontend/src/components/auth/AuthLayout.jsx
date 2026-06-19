import { Link } from "react-router-dom";
import { GraduationCap, CheckCircle2 } from "lucide-react";

const benefits = [
  "Personalised AI career guidance",
  "Top 10 career matches in minutes",
  "Chat 24/7 in Hindi or English",
];

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="flex min-h-screen bg-offwhite">
      {/* Left brand panel — hidden on small screens */}
      <div className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-brand-blue to-brand-indigo p-12 lg:flex">
        <Link to="/" className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-white" />
          <span className="text-xl font-bold text-white">Next Move</span>
        </Link>

        <div>
          <h2 className="text-3xl font-bold leading-tight text-white">
            Stop guessing your future.
          </h2>
          <p className="mt-3 max-w-sm text-blue-100">
            Join thousands of students discovering careers that truly fit them.
          </p>

          <ul className="mt-8 space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-3 text-blue-50">
                <CheckCircle2 className="h-5 w-5 text-accent-teal" />
                <span className="text-sm">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-blue-200">
          © 2026 Next Move. Built for Class 10 &amp; 12 students.
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex w-full items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Mobile logo (shown only when brand panel is hidden) */}
          <Link to="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <GraduationCap className="h-7 w-7 text-brand-blue" />
            <span className="text-lg font-bold text-brand-blue">Next Move</span>
          </Link>

          <h1 className="text-2xl font-bold text-brand-blue">{title}</h1>
          {subtitle && <p className="mt-1.5 text-sm text-slate-500">{subtitle}</p>}

          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}