import React from "react";
import "./About.css";
import { CgProfile } from "react-icons/cg";
import { IconContext } from "react-icons/lib";

export default function About() {
  return (
    <>
    {/* Navbar */}
          <header className="navbar">
            <h2 className="logo">HI CHICKEN</h2>
            <nav>
              <a href="/home">Home</a>
              <a href="/order">Shop</a>
              <a href="/About">About</a>
              <a href="/contactus">Contact</a>
            </nav>
            <IconContext.Provider value={{ size:"2em",color: "maroon" }}>
            <div className="cart"><CgProfile /></div></IconContext.Provider>
          </header>

    <div className="about">

      {/* Hero Section */}
      <div className="about-hero">
        <h1>About Us</h1>
        <p>Fresh & Hygienic Chicken Delivered to Your Doorstep</p>
      </div>

      {/* Content Section */}
      <div className="about-container">

        <div className="about-text">
          <h2>Who We Are</h2>
          <p>
            HI CHICKEN is a trusted chicken delivery service committed to
            providing fresh, clean, and halal chicken directly to your home.
            We ensure the highest standards of hygiene and quality in every order.
          </p>

          <h2>Our Mission</h2>
          <p>
            Our mission is to deliver farm-fresh chicken with convenience,
            affordability, and safety. We aim to make quality meat accessible
            to every household.
          </p>

          <h2>Why Choose Us</h2>
          <ul>
            <li>100% Fresh & Hygienic</li>
            <li>Halal Certified</li>
            <li>Fast Home Delivery</li>
            <li>Affordable Pricing</li>
          </ul>
        </div>

        {/* Notice Section */}
        <div className="notice-box">
          <h3>Important Notice</h3>
          <p>
            ഞങ്ങൾ ചിക്കൻ ശുചീകരണം, മുറിക്കൽ, പാക്കിംഗ് എന്നിവയിൽ കർശനമായ ശുചിത്വ മാനദണ്ഡങ്ങൾ പാലിക്കുന്നു.
ഓർഡർ പ്രോസസ്സ് ചെയ്തതിന് ശേഷം അത് റദ്ദാക്കാൻ സാധിക്കില്ല.
ഡെലിവറി സമയം സ്ഥലവും ആവശ്യകതയും ആശ്രയിച്ച് വ്യത്യാസപ്പെട്ടേക്കാം.
          </p>
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