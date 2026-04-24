import React, { useEffect, useState } from "react";
import axios from "axios";
import "./money.css";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IconContext } from "react-icons/lib";


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
        const res = await axios.get("https://hichicken1.onrender.com/api/price/today");
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
        <h2 className="logo">HI CHICKEN</h2>
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
              <img
                src={`https://www.hichicken.in/uploads/${item.image}`}
                alt={item.name}
              />
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