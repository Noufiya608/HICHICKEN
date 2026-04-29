import React, { useEffect, useState } from "react";
import axios from "axios";
import "./money.css";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IconContext } from "react-icons/lib";
import { BASE_URL } from "../../config";


const Money = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState(null);
    

  // 👉 Navigate with full product data
  const handleOrder = (item) => {
    navigate("/order", { state: item });
  };

  // 🔥 Today's price
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/price/today`);
        setPrice(res.data?.pricePerKg || 0);
      } catch (err) {
        console.error(err);
        setPrice(0);
      }
    };
    fetchPrice();
  }, []);

  // 🔥 Products
  useEffect(() => {
    axios
      .get("https://hichicken1.onrender.com/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

const yesterdayPrice = 150;
const getTrend = () => {
  if (price === null) return null;

  if (price > yesterdayPrice) {
    return { symbol: "📈", color: "green", text: "Increased" };
  } else if (price < yesterdayPrice) {
    return { symbol: "📉", color: "red", text: "Decreased" };
  } else {
    return { symbol: "➖", color: "gray", text: "No Change" };
  }
};

const trend = getTrend();

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

        <IconContext.Provider value={{ size: "2em", color: "maroon" }}>
        <div onClick={() => navigate("/profile")}>
  <CgProfile />
</div>
        </IconContext.Provider>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Fresh & Clean Chicken</h1>
          <p>Delivered hygienically to your doorstep</p>
        </div>
      </section>

      {/* Price */}
     <section className="price-section">

  <div>
    <h2>Yesterday's Price</h2>
    <p>₹{yesterdayPrice}</p>
  </div>

  {/* 🔥 Arrow in middle */}
  <div className="price-trend">
    {price === null ? (
      <p>Loading...</p>
    ) : (
      <span style={{ color: trend.color, fontSize: "30px" }}>
        {trend.symbol}
      </span>
    )}
  </div>

  <div>
    <h2>Today's Price</h2>
    <p>{price === null ? "Loading..." : `₹${price}`}</p>
  </div>

</section>

      {/* Products */}
      <section className="products">
        <h2>Our Fresh Cuts</h2>

        <div className="product-grid">
          {products.map((item) => (
            <div className="card" key={item._id}>
             
               <img src={item.image} alt={item.name} />
               
              
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>

              {/* 🔥 SEND PRODUCT */}
              <button onClick={() => handleOrder(item)}>
                Order Now
              </button>
            </div>
          ))}
        </div>
      </section>
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
};

export default Money;