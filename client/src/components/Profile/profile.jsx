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

  // 🔹 Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("https://hichicken1.onrender.com/api/auth/user/:id", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        console.log("PROFILE:", res.data);
        setUser(res.data);

      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  // 🔹 Handle input
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // 🔹 Save profile
  const handleSave = async () => {
    try {
      const res = await axios.put(
        "/api/user/me",
        {
          name: user.name,
          location: user.location
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setUser(res.data);
      setEditMode(false);
      alert("Profile updated successfully");

    } catch (err) {
      console.error(err);
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
            value={user?.name || ""}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={user?.email || ""}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <textarea
            name="location"
            value={user?.location || ""}
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