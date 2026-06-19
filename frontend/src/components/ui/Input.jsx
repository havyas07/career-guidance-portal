export default function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  maxLength,
}) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors
          placeholder:text-slate-400 focus:ring-1
          ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-500"
              : "border-slate-200 focus:border-brand-indigo focus:ring-brand-indigo"
          }`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}