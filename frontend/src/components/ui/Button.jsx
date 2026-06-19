import { Link } from "react-router-dom";

// variant: "accent" (orange CTA - 10%) | "primary" (blue - 30%) | "outline"
export default function Button({
  children,
  variant = "accent",
  to,
  onClick,
  className = "",
  type = "button",
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    accent:
      "bg-accent-orange text-white hover:bg-orange-600 focus:ring-accent-orange",
    primary:
      "bg-brand-blue text-white hover:bg-brand-indigo focus:ring-brand-blue",
    outline:
      "border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white focus:ring-brand-blue",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  // If "to" is passed, render a router link; otherwise a normal button
  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}