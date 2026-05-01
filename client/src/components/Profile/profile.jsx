import React, { useEffect, useState } from "react";
import axios from "axios";
import "./profile.css";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    location: ""
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    console.log("✅ Profile page loaded");

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("🔑 TOKEN:", token);

        if (!token) {
          console.log("❌ No token found. Please login.");
          return;
        }

        const res = await axios.get("https://hichicken1.onrender.com/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log("📦 PROFILE DATA:", res.data);

        setUser({
          name: res.data.name || "",
          email: res.data.email || "",
          location: res.data.location || ""
        });

      } catch (err) {
        console.error("❌ ERROR:", err.response?.data || err.message);
      }
    };

    fetchProfile();
  }, []);

  // 🔹 Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // 🔹 Save updated profile
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        "https://hichicken1.onrender.com/api/auth/me",
        {
          name: user.name,
          location: user.location
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("✅ UPDATED DATA:", res.data);

      setUser(res.data);
      setEditMode(false);
      alert("Profile updated successfully");

    } catch (err) {
      console.error("❌ UPDATE ERROR:", err.response?.data || err.message);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>My Profile</h2>

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

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={user.email}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <textarea
            name="location"
            value={user.location}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        {!editMode ? (
          <button className="edit-btn" onClick={() => setEditMode(true)}>
            Edit Profile
          </button>
        ) : (
          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;