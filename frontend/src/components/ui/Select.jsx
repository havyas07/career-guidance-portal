export default function Select({ label, name, value, onChange, error, options }) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:ring-1
          ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-500"
              : "border-slate-200 focus:border-brand-indigo focus:ring-brand-indigo"
          }`}
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}