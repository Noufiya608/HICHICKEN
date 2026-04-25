import React, { useEffect, useState } from "react";
import "./Shop.css";
import { useLocation, useNavigate } from "react-router-dom";

const Shop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;

  // ❗ If no product
  if (!product) {
    return <h2 style={{ textAlign: "center" }}>No product selected</h2>;
  }

  const [price] = useState(product.price);
  const [productName] = useState(product.name);
  const [quantity, setQuantity] = useState(1);
  const deliveryCharge = 50;
  const [total, setTotal] = useState(0);

  // 🔥 Calculate total
  useEffect(() => {
    setTotal(quantity * price + deliveryCharge);
  }, [quantity, price]);

  // 🔥 HANDLE PAYMENT (LOGIN CHECK)
  const handlePayment = () => {
    const token = localStorage.getItem("token");

    const orderData = {
      productName,
      quantity,
      total,
    };

    if (!token) {
      // ❌ NOT LOGGED IN → GO TO LOGIN
      navigate("/login", { state: orderData });
    } else {
      // ✅ LOGGED IN → GO TO PAYMENT
      navigate("/pay", { state: orderData });
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
        <div className="cart">🛒</div>
      </header>

      <div className="shop-container">
        <div className="shop-card">
          <h1 className="title">HI CHICKEN</h1>

          {/* Product Name */}
          <p className="subtitle">{productName}</p>

          {/* Price */}
          <div className="price-box">
            <p>Price per Kg</p>
            <h2>₹{price}</h2>
          </div>

          {/* Quantity */}
          <div className="input-group">
            <label>Quantity (Kg)</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>

          {/* Delivery */}
          <div className="row">
            <span>Delivery</span>
            <span>₹{deliveryCharge}</span>
          </div>

          {/* Total */}
          <div className="row total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          {/* ✅ PAYMENT BUTTON */}
          <button onClick={handlePayment}>
            Continue to Payment
          </button>
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
};

export default Shop;