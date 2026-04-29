import React, { useState } from "react";
import axios from "axios";
import "./auth.css";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [location, setLocation] = useState({
    lat: null,
    lng: null,
    addressText: ""
  });

  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(""); // gps or manual

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddressChange = (e) =>
    setLocation({ ...location, addressText: e.target.value });

  // 📍 GPS LOCATION
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("GPS not supported");
      return;
    }
    
    setLoading(true);
    setMode("gps");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          );
          const data = await res.json();

          setLocation({
            lat,
            lng,
            addressText: data.display_name
          });

        } catch (err) {
          setLocation({ lat, lng, addressText: "" });
        }

        setLoading(false);
      },
      () => {
        setLoading(false);
        alert("Failed to get location");
      }
    );
  };

  const submit = async (e) => {
    e.preventDefault();

    // validation
    if (mode === "manual" && !location.addressText) {
      alert("Please enter address");
      return;
    }

    if (mode === "gps" && !location.lat) {
      alert("Please enable GPS");
      return;
    }

    if (!mode) {
      alert("Select GPS or Manual address");
      return;
    }

    try {
      await axios.post(
        "https://hichicken1.onrender.com/api/auth/signup",
        {
          ...form,
          location
        }
      );

      alert("Signup successful");
      window.location.href = "/login";

    } catch (err) {
      console.log(err);
      alert("Signup failed");
    }
  };

  return (
    <div className="auth">
      <form onSubmit={submit}>
        <h2>Sign up</h2>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        {/* 🔘 CHOOSE MODE */}
        <div style={{ marginTop: "10px" }}>
            <button
            type="button"
            onClick={() => setMode("manual")}
            style={{
              background: mode === "manual" ? "red" : "blue",
              color: "white"
            }}
          >
            ✍️ Enter Address Manually
          </button>
        
          <button
            type="button"
            onClick={getCurrentLocation}
            style={{
              background: mode === "gps" ? "red" : "blue",
              color: "white",
              marginRight: "10px"
            }}
          >
            📍 Use Current Location
          </button>
</div>
        

        {/* 📍 GPS RESULT */}
        {mode === "gps" && location.lat && (
          <div style={{ marginTop: "10px" }}>
            <p>Latitude: {location.lat}</p>
            <p>Longitude: {location.lng}</p>
            {location.addressText && (
              <p>{location.addressText}</p>
            )}
          </div>
        )}

        {/* ✍️ MANUAL ADDRESS */}
        {mode === "manual" && (
          <textarea
            placeholder="Enter full delivery address"
            value={location.addressText}
            onChange={handleAddressChange}
            style={{
              width: "100%",
              marginTop: "10px",
              padding: "8px"
            }}
          />
        )}

        <button type="submit">
          {loading ? "Processing..." : "Sign up"}
        </button>
      </form>
    </div>
  );
}