import React, { useEffect, useState } from "react";
import axios from "axios";
import "./profile.css";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    location: {
      lat: "",
      lng: "",
      addressText: ""
    }
  });

  const [editMode, setEditMode] = useState(false);

  // ✅ Fetch Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://hichicken1.onrender.com/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log("📦 PROFILE:", res.data);

        setUser({
          name: res.data.name || "",
          email: res.data.email || "",
          address: res.data.address || "",
          location: res.data.location || {}
        });

      } catch (err) {
        console.error("❌ ERROR:", err.response?.data || err.message);
      }
    };

    fetchProfile();
  }, []);

  // 🔹 Handle Input Change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // 🔹 Get Current Location
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        console.log("📍 LAT:", lat, "LNG:", lng);

        try {
          const res = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          );

          const address = res.data.display_name;

          setUser((prev) => ({
            ...prev,
            address: address,
            location: {
              lat,
              lng,
              addressText: address
            }
          }));

        } catch (err) {
          console.log("❌ Address fetch failed");

          setUser((prev) => ({
            ...prev,
            location: { lat, lng }
          }));
        }
      },
      () => {
        alert("Location permission denied");
      }
    );
  };

  // 🔹 Save Profile
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        "https://hichicken1.onrender.com/api/auth/me",
        {
          name: user.name,
          address: user.address,
          location: user.location // ✅ IMPORTANT
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("✅ UPDATED:", res.data);

     setUser(res.data);

      setEditMode(false);

    } catch (err) {
      console.error("❌ UPDATE ERROR:", err.response?.data || err.message);
    }
  };

  // ✅ CONDITIONS
  const hasLocation =
    user.location?.lat && user.location?.lng;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>My Profile</h2>

        {/* NAME */}
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        {/* EMAIL */}
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={user.email} disabled />
        </div>

        {/* ADDRESS (ONLY IF LOCATION NOT SET) */}
        {!hasLocation && (
          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              value={user.address}
              onChange={handleChange}
              disabled={!editMode}
              placeholder="Enter your address"
            />

            {/* 📍 BUTTON */}
            {editMode && (
              <button
                style={{ marginTop: "10px" }}
                onClick={handleGetLocation}
              >
                📍 Use Current Location
              </button>
            )}
          </div>
        )}

        {/* LOCATION DISPLAY */}
        {hasLocation && (
          <div className="form-group">
            <label>Location</label>
            <p>
              📍 {user.location.lat}, {user.location.lng}
            </p>

            {user.location?.addressText && (
              <p>{user.location.addressText}</p>
            )}

            {/* SWITCH BACK */}
            {editMode && (
              <button
                style={{ marginTop: "10px" }}
                onClick={() =>
                  setUser({
                    ...user,
                    location: {},
                    address: ""
                  })
                }
              >
                Use Manual Address Instead
              </button>
            )}
          </div>
        )}

        {/* BUTTONS */}
        {!editMode ? (
          <button onClick={() => setEditMode(true)}>
            Edit Profile
          </button>
        ) : (
          <button onClick={handleSave}>
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;