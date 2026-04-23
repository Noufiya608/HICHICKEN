import React, { useEffect, useState } from "react";
import axios from "axios";
import "./money.css";
import { redirect, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IconContext } from "react-icons/lib";

const Money = () => {
   const navigate = useNavigate();

  const handleClick = () => {
    navigate("/order");}
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/price/today");
        setPrice(res.data?.pricePerKg || 0);
      } catch (err) {
        console.error(err);
        setPrice(0);
      }

    };
    fetchPrice();
   
  }, []);

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

      {/* Hero */}
      <section className="hero">
        <div className="overlay"></div>

        <div className="hero-content">
          <h1>Fresh & Clean Chicken </h1>
         
          <p>Delivered hygienically to your doorstep</p>
           <button onClick={handleClick}>Order Now</button>
        </div>
      </section>

      {/* Price Section */}
      <section className="price-section">
        <h2>Today's Price</h2>
        <p>{price === null ? "Loading..." : `₹${price}`}</p>
      </section>

      {/* Products */}
      <section className="products">
        <h2>Our Fresh Cuts</h2>

        <div className="product-grid">
          <div className="card">
            <img src="/069c151bbee45f1c50a6acf6f90f28f6.webp" alt="" />
            <h4>Tenderloin</h4>
            <p>₹{price}</p>
            <button>order now</button>
          </div>

          <div className="card">
            <img src="/wholechicken.jpg" alt="" />
            <h4>Whole Chicken</h4>
            <p>₹{price}</p>
            <button>order now</button>
          </div>

          <div className="card">
            <img src="/cut.jpg" alt="" />
            <h4>Cut Pieces</h4>
            <p>₹{price}</p>
            <button>order now</button>
          </div>

          <div className="card">
            <img src="/boneless.jpg" alt="" />
            <h4>Boneless</h4>
            <p>₹{price}</p>
            <button>order now</button>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="banner">
        <div className="banner-box">
          <h3>100% Fresh</h3>
          <button onClick={handleClick}>Order Now</button>
        </div>

        <div className="banner-box light">
          <h3>Fast Delivery</h3>
          <p>Within 60 minutes</p>
        </div>
      </section>

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
};

export default Money;