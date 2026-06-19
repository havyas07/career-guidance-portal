import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AuthLayout from "../../components/auth/AuthLayout";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import { sendOtp } from "../../services/authService";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", mobile: "", class_grade: "", city: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    // mobile: digits only
    const cleaned = name === "mobile" ? value.replace(/\D/g, "") : value;
    setForm((prev) => ({ ...prev, [name]: cleaned }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    if (!/^[6-9]\d{9}$/.test(form.mobile))
      e.mobile = "Enter a valid 10-digit mobile number";
    if (!form.class_grade) e.class_grade = "Please select your class";
    if (!form.city.trim()) e.city = "Please enter your city";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await sendOtp(form.mobile);
      // Save pending registration for the OTP screen & beyond
      sessionStorage.setItem("pendingRegistration", JSON.stringify(form));
      navigate("/verify-otp");
    } catch {
      setErrors({ mobile: "Could not send OTP. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="It takes less than 2 minutes to get started."
    >
      <div className="space-y-4">
        <Input
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Priya Sharma"
          error={errors.name}
        />

        <Input
          label="Mobile Number"
          name="mobile"
          type="tel"
          value={form.mobile}
          onChange={handleChange}
          placeholder="10-digit mobile number"
          maxLength={10}
          error={errors.mobile}
        />

        <Select
          label="Class"
          name="class_grade"
          value={form.class_grade}
          onChange={handleChange}
          error={errors.class_grade}
          options={[
            { value: "10", label: "Class 10" },
            { value: "12", label: "Class 12" },
          ]}
        />

        <Input
          label="City"
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="e.g. Nagpur"
          error={errors.city}
        />

        <Button
          variant="accent"
          onClick={handleSubmit}
          className="w-full"
        >
          {loading ? "Sending OTP…" : "Send OTP"}
          {!loading && <ArrowRight className="h-4 w-4" />}
        </Button>

        <p className="text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-brand-blue hover:text-brand-indigo">
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}