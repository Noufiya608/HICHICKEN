import React, { useState } from "react";
import axios from "axios";
import "./auth.css";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    guestaddress: ""
  });

  // ✅ should be boolean (not string)
  const [showPassword, setShowPassword] = useState(false);

  // ✅ locations same as backend enum
  const locations = ["Manacaud", "Ambalathara", "Azad Nagar"];

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    try {
      console.log(form); // debug

      await axios.post("https://hichicken1.onrender.com/api/auth/signup", form);

      alert("✅ Signup successful");

      // optional reset
      setForm({
        name: "",
        email: "",
        password: "",
        address: "",
        guestaddress: ""
      });

      window.location.href = "/";

    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="auth">
      <form onSubmit={submit}>
        <h2>Sign up</h2>

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        {/* 🔹 Password with eye icon */}
        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* ✅ Address Dropdown (REQUIRED) */}
        <select
          name="address"
          value={form.address}
          onChange={handleChange}
          required
        >
          <option value="">Select Address</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        {/* ✅ Guest Address Dropdown (OPTIONAL) */}
        <select
          name="guestaddress"
          value={form.guestaddress}
          onChange={handleChange}
        >
          <option value="">Select Guest Address(Optional)</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <button>Sign up</button>

        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}