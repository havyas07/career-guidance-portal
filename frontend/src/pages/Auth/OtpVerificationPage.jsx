import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import AuthLayout from "../../components/auth/AuthLayout";
import OtpInput from "../../components/auth/OtpInput";
import Button from "../../components/ui/Button";
import { verifyOtp, sendOtp } from "../../services/authService";

const RESEND_SECONDS = 30;

export default function OtpVerificationPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(RESEND_SECONDS);

  // Pull the mobile number saved during registration
  const pending = JSON.parse(sessionStorage.getItem("pendingRegistration") || "{}");
  const mobile = pending.mobile;

  // If someone lands here without registering, send them back
  useEffect(() => {
    if (!mobile) navigate("/register");
  }, [mobile, navigate]);

  // Countdown timer
  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  // Auto-verify once all 6 digits are entered
  useEffect(() => {
    if (otp.length === 6) handleVerify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  const handleVerify = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await verifyOtp(mobile, otp);
      if (res.success) {
        sessionStorage.setItem("authToken", res.token);
        navigate("/set-pin");
      } else {
        setError(res.message || "Invalid OTP");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (seconds > 0) return;
    setOtp("");
    setError("");
    await sendOtp(mobile);
    setSeconds(RESEND_SECONDS);
  };

  // Mask the mobile: 98******10
  const masked = mobile ? mobile.slice(0, 2) + "******" + mobile.slice(-2) : "";

  return (
    <AuthLayout
      title="Verify your number"
      subtitle={`We've sent a 6-digit code to +91 ${masked}`}
    >
      <div className="space-y-6">
        <OtpInput value={otp} onChange={setOtp} />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button variant="accent" onClick={handleVerify} className="w-full">
          {loading ? "Verifying…" : "Verify & Continue"}
          {!loading && <ArrowRight className="h-4 w-4" />}
        </Button>

        {/* Resend row */}
        <div className="text-center text-sm text-slate-500">
          {seconds > 0 ? (
            <span>
              Resend code in{" "}
              <span className="font-semibold text-brand-blue">{seconds}s</span>
            </span>
          ) : (
            <button
              onClick={handleResend}
              className="font-semibold text-accent-teal hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>

        {/* Back to edit number */}
        <button
          onClick={() => navigate("/register")}
          className="mx-auto flex items-center gap-1 text-sm text-slate-400 hover:text-brand-blue"
        >
          <ArrowLeft className="h-4 w-4" />
          Change mobile number
        </button>

        {/* Dev hint — remove later */}
        <p className="rounded-lg bg-teal-50 px-3 py-2 text-center text-xs text-accent-teal">
          Dev mode: enter any 6 digits to continue
        </p>
      </div>
    </AuthLayout>
  );
}