import { ChevronRight, IndianRupee, GraduationCap } from "lucide-react";

export default function CareerMatchCard({ rank, career, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full items-start gap-4 rounded-2xl bg-white p-5 text-left shadow-sm transition-all hover:shadow-md"
    >
      {/* Rank */}
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-blue text-sm font-bold text-white">
        {rank}
      </div>

      {/* Main */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-bold text-brand-blue">{career.name}</h3>
          <span className="flex-shrink-0 rounded-full bg-teal-50 px-2.5 py-1 text-xs font-bold text-accent-teal">
            {career.match}% match
          </span>
        </div>

        <p className="mt-1 line-clamp-2 text-sm text-slate-500">
          {career.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <IndianRupee className="h-3.5 w-3.5 text-accent-teal" />
            {career.salary_range}
          </span>
          <span className="inline-flex items-center gap-1">
            <GraduationCap className="h-3.5 w-3.5 text-brand-indigo" />
            {career.education_path}
          </span>
        </div>
      </div>

      <ChevronRight className="mt-1 h-5 w-5 flex-shrink-0 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-brand-blue" />
    </button>
  );
}