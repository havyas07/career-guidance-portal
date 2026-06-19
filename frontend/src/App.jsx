import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import OtpVerificationPage from "./pages/Auth/OtpVerificationPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-otp" element={<OtpVerificationPage />} />
        {/* /set-pin comes next */}
      </Routes>
    </BrowserRouter>
  );
}