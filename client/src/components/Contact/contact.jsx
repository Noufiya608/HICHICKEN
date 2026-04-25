import React, { useState } from "react";
import "./contact.css";
import { CgProfile } from "react-icons/cg";
import { IconContext } from "react-icons/lib";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import axios from "axios";
export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });
const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value
  });
};
  const submit = async (e) => {
  e.preventDefault();

  try {
    await axios.post("https://hichicken1.onrender.com/api/contact", form);

    alert("✅ Message sent successfully!");
    setForm({ name: "", email: "", message: "" });

  } catch (error) {
    alert("❌ Failed to send message");
  }
};

  return (
    <>
     {/* Navbar */}
          <header className="navbar">
            <h2 className="logo">HI CHICKEN</h2>
            <nav>
              <a href="/">Home</a>
             
              <a href="/About">About</a>
              <a href="/contactus">Contact</a>
            </nav>
            <IconContext.Provider value={{ size:"2em",color: "maroon" }}>
            <div className="cart"><CgProfile /></div></IconContext.Provider>
          </header>
    <div className="contact">
        

      {/* 🔹 Hero Section */}
      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>We deliver fresh & halal chicken to your doorstep</p>
      </div>

      {/* 🔹 Contact Container */}
      <div className="contact-container">

        {/* 🔹 Form */}
        <form onSubmit={submit} className="contact-form">
          <h2>Send Message</h2>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Send Message</button>
        </form>

        {/* 🔹 Info Section */}
        <div className="contact-info">
          <h2>Get in Touch</h2>

          <p><strong><FaLocationDot /><br /> Location:</strong> Near NhBypass Rd,Thiruvallom,Trivandrum,Kerala</p>
          <p><strong><FaPhone /><br /> Phone:</strong> +91 96335 66527</p>
          <p><strong><MdEmail /><br /> Email:</strong>contact@hichicken.com</p>

          <div className="socials">
            <span>Follow Us</span>
            <p><FaInstagramSquare /> Instagram | <FaFacebook /> Facebook</p>
          </div>
        </div>

      </div>

    </div>
    {/* Footer */}
      <footer className="footer">
        <div>
          <h4>About</h4>
          <p>Fresh halal chicken delivered daily.</p>
        </div>

        <div>
          <h4>Links</h4>
          <p>Home</p>
          <p>Shop</p>
        </div>

        <div>
          <h4>Follow</h4>
          <p>Instagram | Facebook</p>
        </div>
      </footer>
    </>
  );
}