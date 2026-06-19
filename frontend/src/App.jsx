import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import OtpVerificationPage from "./pages/Auth/OtpVerificationPage";
import SetPinPage from "./pages/Auth/SetPinPage";
import OnboardingPage from "./pages/Onboarding/OnboardingPage";
import Layout from "./components/dashboard/Layout";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import AssessmentPage from "./pages/Assessment/AssessmentPage";
import ReportLoadingPage from "./pages/Report/ReportLoadingPage";
import ReportPage from "./pages/Report/ReportPage";
import CareerDetailPage from "./pages/Career/CareerDetailPage";
import CareerTastePage from "./pages/Taste/CareerTastePage";
import ChatPage from "./pages/Chat/ChatPage";

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

        {/* Full-screen flows (no sidebar) */}
        <Route path="/assessment" element={<AssessmentPage />} />
        <Route path="/report-loading" element={<ReportLoadingPage />} />
        <Route path="/career/:id/taste" element={<CareerTastePage />} />

        {/* Logged-in app with sidebar */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/career/:id" element={<CareerDetailPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}