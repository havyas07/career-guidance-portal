// import api from "./api"; // ← uncomment when wiring the real backend

// ─────────────────────────────────────────────
// MOCK MODE: OTP is faked for development.
// Any 6-digit code will verify successfully.
// Replace these with real API calls later (MSG91 + /api/auth).
// ─────────────────────────────────────────────

export async function sendOtp(mobile) {
  await new Promise((r) => setTimeout(r, 700)); // fake network delay
  console.log(`[MOCK] OTP "sent" to ${mobile}. Use any 6 digits to verify.`);
  return { success: true, message: "OTP sent" };

  // REAL version later:
  // const { data } = await api.post("/auth/send-otp", { mobile });
  // return data;
}

export async function verifyOtp(mobile, otp) {
  await new Promise((r) => setTimeout(r, 700));
  if (otp.length === 6) {
    return { success: true, token: "mock-jwt-token" };
  }
  return { success: false, message: "Please enter all 6 digits" };

  // REAL version later:
  // const { data } = await api.post("/auth/verify-otp", { mobile, otp });
  // return data;
}