import { Search, Bell, Menu } from "lucide-react";

export default function Topbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4
      border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
      {/* Left: mobile menu + search */}
      <div className="flex flex-1 items-center gap-3">
        <button
          onClick={onMenuClick}
          className="text-brand-blue lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="relative hidden max-w-md flex-1 sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search careers, assessments..."
            className="w-full rounded-lg border border-slate-200 bg-offwhite py-2 pl-10 pr-4
              text-sm text-slate-700 outline-none focus:border-brand-indigo focus:ring-1 focus:ring-brand-indigo"
          />
        </div>
      </div>

      {/* Right: notifications + profile */}
      <div className="flex items-center gap-4">
        <button className="relative text-slate-500 hover:text-brand-blue">
          <Bell className="h-6 w-6" />
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-accent-orange" />
        </button>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-brand-blue">Havya</p>
            <p className="text-xs text-slate-500">Student</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full
            bg-brand-indigo text-sm font-semibold text-white">
            H
          </div>
        </div>
      </div>
    </header>
  );
}