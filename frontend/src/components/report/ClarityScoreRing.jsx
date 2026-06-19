export default function ClarityScoreRing({ score = 0, size = 160 }) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(score, 100) / 100) * circumference;

  return (
    <div
      className="relative flex flex-shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#E2E8F0" strokeWidth="9" />
        <circle
          cx="50" cy="50" r={radius}
          fill="none" stroke="#0D9488" strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.2s ease" }}
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-4xl font-extrabold text-brand-blue">{score}</p>
        <p className="text-xs font-medium text-slate-400">out of 100</p>
      </div>
    </div>
  );
}