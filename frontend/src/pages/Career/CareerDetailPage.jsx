import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, IndianRupee, GraduationCap, Sparkles,
  CheckCircle2, Clock, Wrench, Rocket, ArrowRight,
} from "lucide-react";
import { getCareerByIndex, getCareerDetail } from "../../services/careerService";

export default function CareerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const career = getCareerByIndex(id);

  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!career) return;
    let active = true;
    setLoading(true);
    getCareerDetail(career)
      .then((d) => active && setDetail(d))
      .catch(() => active && setDetail(null))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Bad index / no report
  if (!career) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="text-xl font-bold text-brand-blue">Career not found</h1>
        <button
          onClick={() => navigate("/report")}
          className="mt-4 rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-indigo"
        >
          Back to Report
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Back */}
      <button
        onClick={() => navigate("/report")}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-brand-blue"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Report
      </button>

      {/* Header card */}
      <div className="rounded-2xl bg-gradient-to-br from-brand-blue to-brand-indigo p-7 text-white">
        <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
          {career.match}% match for you
        </span>
        <h1 className="mt-3 text-3xl font-bold">{career.name}</h1>
        <p className="mt-2 max-w-xl text-blue-100">{career.description}</p>

        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <span className="inline-flex items-center gap-1.5">
            <IndianRupee className="h-4 w-4 text-accent-teal" />
            {career.salary_range}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <GraduationCap className="h-4 w-4 text-accent-teal" />
            {career.education_path}
          </span>
        </div>
      </div>

      {/* Loading skeleton */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse rounded-2xl bg-white p-6 shadow-sm">
              <div className="h-4 w-1/3 rounded bg-slate-200" />
              <div className="mt-3 h-3 w-full rounded bg-slate-100" />
              <div className="mt-2 h-3 w-5/6 rounded bg-slate-100" />
            </div>
          ))}
        </div>
      ) : detail ? (
        <>
          {/* Overview */}
          <Section icon={Sparkles} title="What This Career Is About">
            <p className="leading-relaxed text-slate-600">{detail.overview}</p>
          </Section>

          {/* Why it fits you */}
          <div className="rounded-2xl border border-accent-teal/20 bg-teal-50/40 p-6">
            <div className="flex items-center gap-2 text-accent-teal">
              <CheckCircle2 className="h-5 w-5" />
              <h2 className="font-bold">Why It Fits You</h2>
            </div>
            <p className="mt-2 leading-relaxed text-slate-600">{detail.why_fits_you}</p>
          </div>

          {/* Day in the life */}
          <Section icon={Clock} title="A Day in the Life">
            <ul className="space-y-2">
              {detail.day_in_life?.map((item, i) => (
                <li key={i} className="flex gap-3 text-slate-600">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-indigo" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          {/* Key skills */}
          <Section icon={Wrench} title="Key Skills You'll Need">
            <div className="flex flex-wrap gap-2">
              {detail.key_skills?.map((skill, i) => (
                <span
                  key={i}
                  className="rounded-full bg-offwhite px-3 py-1.5 text-sm font-medium text-brand-blue"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Section>

          {/* Getting started */}
          <Section icon={Rocket} title="How to Get Started">
            <ol className="space-y-3">
              {detail.getting_started?.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-blue text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-slate-600">{step}</span>
                </li>
              ))}
            </ol>
          </Section>
        </>
      ) : (
        <p className="text-center text-slate-400">Couldn't load extra details.</p>
      )}

      {/* Taste CTA */}
      <div className="sticky bottom-4 rounded-2xl bg-white p-4 shadow-lg ring-1 ring-slate-100">
        <button
          onClick={() => navigate(`/career/${id}/taste`)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent-orange px-6 py-3.5 text-sm font-semibold text-white hover:bg-orange-600"
        >
          Taste This Career — Try a 5-min simulation
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// Small reusable section wrapper
function Section({ icon: Icon, title, children }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 text-brand-blue">
        <Icon className="h-5 w-5 text-brand-indigo" />
        <h2 className="font-bold">{title}</h2>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}