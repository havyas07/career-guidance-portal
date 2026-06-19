import { useRef } from "react";

export default function OtpInput({ length = 6, value, onChange, mask = false }) {
  const inputs = useRef([]);

  const digits = value.split("");

  const focusBox = (i) => {
    if (i >= 0 && i < length) inputs.current[i]?.focus();
  };

  const handleChange = (e, index) => {
    const digit = e.target.value.replace(/\D/g, "");
    if (!digit) return;

    const char = digit[digit.length - 1];
    const next = value.split("");
    next[index] = char;
    onChange(next.join("").slice(0, length));

    focusBox(index + 1);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const next = value.split("");
      if (next[index]) {
        next[index] = "";
        onChange(next.join(""));
      } else {
        next[index - 1] = "";
        onChange(next.join(""));
        focusBox(index - 1);
      }
    } else if (e.key === "ArrowLeft") {
      focusBox(index - 1);
    } else if (e.key === "ArrowRight") {
      focusBox(index + 1);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    onChange(pasted);
    focusBox(Math.min(pasted.length, length - 1));
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={mask && digits[i] ? "•" : digits[i] || ""}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className="h-12 w-12 rounded-lg border border-slate-200 bg-white text-center text-xl font-bold text-brand-blue outline-none transition-colors focus:border-brand-indigo focus:ring-1 focus:ring-brand-indigo sm:h-14 sm:w-14"
        />
      ))}
    </div>
  );
}