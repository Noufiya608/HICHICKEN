import React from "react";
import "./About.css";
import { CgProfile } from "react-icons/cg";
import { IconContext } from "react-icons/lib";

export default function About() {
  return (
    <>
    {/* Navbar */}
          <header className="navbar">
            <div className="logo-container">
    <img src="/Chicken Logo.jpg" alt="Hi Chicken Logo" className="logo-img" />
  </div>
            <nav>
              <a href="/">Home</a>
           
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
          <h2>HI CHICKEN</h2>
          <p>
           No more searching everywhere for pure chicken. We deliver naturally prepared, healthy chicken straight to your doorstep.
          </p>

          <h2>OUR AIM </h2>
          <p>
            The most important thing is ensuring that the chicken we eat is prepared in a natural and healthy way. That’s why Hi Chicken brings you freshly prepared, 100% Halal chicken every day. Moreover, you can enjoy this service with free delivery charges.
          </p>

          <h2>OUR SPECIALITIES</h2>
          <ul>
            <li>Traditional Purity (Ethical Purity): Every chicken is prepared with trust, care, and by strictly following all hygiene and purity standards.</li>
            <li>Fresh Every Day: We deliver only freshly prepared chicken made fresh every single day.</li>
            <li>Free Delivery: No need to worry about extra charges; we deliver chicken to your preferred location with absolutely no delivery fee.</li>
            <li>Easy Ordering: Save your time! Simply scan the QR code on the website and place your order within seconds.</li>
          </ul>
        </div>
        

        {/* Notice Section */}
        <div className="notice-box">
          <h3>Important Notice</h3>
          <p>
           We strictly follow hygiene standards in chicken cleaning, cutting, and packaging.
Once an order is processed, it cannot be cancelled.
Delivery time may vary depending on the location and demand. <br />  <br /> 
 <img src="/aboutimg.png" alt="" />
          </p>
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