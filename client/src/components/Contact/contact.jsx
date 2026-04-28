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
    await axios.post(
      "https://hichicken1.onrender.com/api/contact/sendme",
      form,
      { timeout: 15000 }
    );

    alert("✅ Message sent successfully!");   // ✅ ADD THIS
    setForm({ name: "", email: "", message: "" }); // ✅ RESET FORM

  } catch (error) {
    console.log("ERROR:", error.response || error.message);
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
  value={form.name}
  onChange={handleChange}
  required
/>

<input
  type="email"
  name="email"
  placeholder="Your Email"
  value={form.email}
  onChange={handleChange}
  required
/>

<textarea
  name="message"
  placeholder="Your Message"
  rows="5"
  value={form.message}
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
     <div>
      <section className="banner-container">
      <div className="banner-card">
        {/* Background Image Container */}
        <div className="banner-image-wrapper">
          <img 
            src="/heroimage.png" 
            alt="Fresh Chicken Cuts" 
            className="bg-image"
          />
          <div className="overlay"></div>
        </div>

        {/* Text Content */}
        <div className="banner-text-content">
          <h1 className="banner-title">HI CHICKEN</h1>
          <p className="banner-description">
            Order fresh, clean, and premium Quality chicken online and 
            get it delivered in minutes. we ensure every bite is fresh, safe, 
            and full of flavor.
          </p>
          <p className="banner-sub-description">
            Order From Anywhere Anytime without charging extra 
            delivery charges. quick scan to order now.
          </p>
        </div>
      </div>
    </section>
      <footer className="footer-wrapper">
       {/* Bottom Footer */}
      <div className="footer-bottom">
        <div className="footer-logo">
  <img src="/logo.jpeg" alt="Company Logo" />
</div>

        <div className="links">
          <h4>Products</h4>
          <p>Boneless</p>
          <p>Curry cuts</p>
          <p>Tenderloine</p>
          <p>Wholechicken</p>
        </div>

        <div className="links">
          <h4>Linka</h4>
          <p>FAQs</p>
          <p>About</p>
          <p>Help</p>
        </div>

        <div className="links">
          <h4>Follow</h4>
          <p>Instagram</p>
          <p>Facebook</p>
          
        </div>
      </div>
    </footer>
    </div>
    </>
  );
}