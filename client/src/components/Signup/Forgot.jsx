import React, { useState } from "react";
import axios from "axios";
import "./auth.css";

export default function Forgot() {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState("")

  // 🔹 Send OTP
  const sendOtp = async () => {
    try {
      await axios.post("https://hichicken1.onrender.com/api/auth/send-otp", { email });
      alert("📩 OTP sent to your email");
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.message || "Error sending OTP");
    }
  };

  // 🔹 Reset Password
  const resetPassword = async () => {
    try {
      await axios.post("https://hichicken1.onrender.com/api/auth/reset-password", {
        email,
        otp,
        newPassword
      });

      alert("✅ Password updated");
      window.location.href = "/";

    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="auth">
      <h2>Reset Password</h2>

      {step === 1 && (
        <>
          <input
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
          />
          {/* 🔹 Password with eye icon */}
        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>
           
          
          <button onClick={resetPassword}>Reset Password</button>
        </>
      )}
    </div>
  );
}