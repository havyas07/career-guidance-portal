import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import OtpVerificationPage from "./pages/Auth/OtpVerificationPage";
import SetPinPage from "./pages/Auth/SetPinPage";
import OnboardingPage from "./pages/Onboarding/OnboardingPage";
import Layout from "./components/dashboard/Layout";
import DashboardPage from "./pages/Dashboard/DashboardPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public + auth (no sidebar) */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-otp" element={<OtpVerificationPage />} />
        <Route path="/set-pin" element={<SetPinPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />

        {/* Logged-in app (shared sidebar + topbar via Layout) */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* /assessment, /report, /chat, /careers, /profile added later */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}