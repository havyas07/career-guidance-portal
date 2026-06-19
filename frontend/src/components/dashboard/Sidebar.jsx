import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Compass,
  CalendarCheck,
  BookOpen,
  User,
  GraduationCap,
  X,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Assessment", path: "/assessment", icon: ClipboardList },
  { name: "Explore Careers", path: "/careers", icon: Compass },
  { name: "Book a Session", path: "/sessions", icon: CalendarCheck },
  { name: "Resources", path: "/resources", icon: BookOpen },
  { name: "Profile", path: "/profile", icon: User },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-brand-blue text-white
          transition-transform duration-300 lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo + mobile close */}
        <div className="flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-accent-orange" />
            <span className="text-xl font-bold tracking-tight">CareerPath</span>
          </div>
          <button onClick={onClose} className="lg:hidden">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="mt-4 flex flex-1 flex-col gap-1 px-3">
          {navItems.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={name}
              to={path}
              end={path === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors
                ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon className="h-5 w-5" />
              {name}
            </NavLink>
          ))}
        </nav>

        {/* Accent CTA (our 10%) */}
        <div className="p-4">
          <NavLink
            to="/assessment"
            onClick={onClose}
            className="flex items-center justify-center gap-2 rounded-lg bg-accent-orange
              px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
          >
            <ClipboardList className="h-5 w-5" />
            Take Assessment
          </NavLink>
        </div>
      </aside>
    </>
  );
}