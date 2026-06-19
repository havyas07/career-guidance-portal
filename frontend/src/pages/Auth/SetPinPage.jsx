import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import AuthLayout from "../../components/auth/AuthLayout";
import OtpInput from "../../components/auth/OtpInput";
import Button from "../../components/ui/Button";

export default function SetPinPage() {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");

  // Must have verified OTP to reach here
  const pending = JSON.parse(sessionStorage.getItem("pendingRegistration") || "{}");
  useEffect(() => {
    if (!pending.mobile || !sessionStorage.getItem("authToken")) {
      navigate("/register");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = () => {
    setError("");
    if (pin.length !== 4) {
      setError("Please enter a 4-digit PIN");
      return;
    }
    if (confirmPin.length !== 4) {
      setError("Please re-enter your PIN to confirm");
      return;
    }
    if (pin !== confirmPin) {
      setError("PINs do not match. Please try again.");
      setConfirmPin("");
      return;
    }

    // ── MOCK: create the local "user account" ──
    // Later this becomes a real POST /api/users/profile call.
    const user = { ...pending, pin };
    localStorage.setItem("nextmove_user", JSON.stringify(user));
    sessionStorage.removeItem("pendingRegistration");

    navigate("/onboarding");
  };

  return (
    <AuthLayout
      title="Set your login PIN"
      subtitle="Create a 4-digit PIN you'll use to log in next time."
    >
      <div className="space-y-7">
        {/* Lock badge */}
        <div className="flex items-center gap-3 rounded-xl bg-offwhite p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue text-white">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <p className="text-sm text-slate-600">
            Your PIN keeps your career data private and secure.
          </p>
        </div>

        {/* Enter PIN */}
        <div>
          <p className="mb-3 text-center text-sm font-medium text-slate-700">
            Enter PIN
          </p>
          <OtpInput length={4} value={pin} onChange={setPin} mask />
        </div>

        {/* Confirm PIN */}
        <div>
          <p className="mb-3 text-center text-sm font-medium text-slate-700">
            Confirm PIN
          </p>
          <OtpInput length={4} value={confirmPin} onChange={setConfirmPin} mask />
        </div>

        {error && <p className="text-center text-sm text-red-500">{error}</p>}

        <Button variant="accent" onClick={handleSubmit} className="w-full">
          Create Account
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </AuthLayout>
  );
}