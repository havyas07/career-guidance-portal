import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import OtpVerificationPage from "./pages/Auth/OtpVerificationPage";
import SetPinPage from "./pages/Auth/SetPinPage";
import OnboardingPage from "./pages/Onboarding/OnboardingPage";
import Layout from "./components/dashboard/Layout";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import AssessmentPage from "./pages/Assessment/AssessmentPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public + auth */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-otp" element={<OtpVerificationPage />} />
        <Route path="/set-pin" element={<SetPinPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />

        {/* Full-screen assessment (no sidebar) */}
        <Route path="/assessment" element={<AssessmentPage />} />

        {/* Logged-in app with sidebar */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        {/* Temporary placeholder — real screen built next */}
        <Route path="/report-loading" element={<div className="p-10">Building your report… (next screen)</div>} />
      </Routes>
    </BrowserRouter>
  );
}