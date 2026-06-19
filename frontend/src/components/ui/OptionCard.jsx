export default function OptionCard({ icon: Icon, label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-2xl border-2 bg-white p-5 text-left transition-all duration-150
        ${
          selected
            ? "border-brand-blue bg-blue-50/50 shadow-sm"
            : "border-slate-100 hover:border-brand-indigo/40 hover:shadow-sm"
        }`}
    >
      {Icon && (
        <div
          className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-colors
            ${selected ? "bg-brand-blue text-white" : "bg-offwhite text-brand-blue"}`}
        >
          <Icon className="h-6 w-6" />
        </div>
      )}
      <span
        className={`text-base font-medium ${
          selected ? "text-brand-blue" : "text-slate-700"
        }`}
      >
        {label}
      </span>
    </button>
  );
}