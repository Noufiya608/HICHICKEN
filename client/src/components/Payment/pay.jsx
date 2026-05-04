import React, { useState } from "react";
import axios from "axios";
import "./pay.css";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react"; 


  // 👈 add useEffect

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // optional (remove if you want instant jump)
    });
  }, []);

  const order = location.state;

  // ✅ Load Razorpay dynamically
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        console.log("✅ Razorpay SDK loaded");
        resolve(true);
      };
      script.onerror = () => {
        console.error("❌ Razorpay SDK failed to load");
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  // 🔐 Payment Handler
  const handlePayment = async () => {
    try {
      if (!order?.total) {
        alert("Invalid order amount");
        return;
      }

      console.log("💰 Sending Amount:", order.total);
      setLoading(true);

      // 1️⃣ Load Razorpay
      const isLoaded = await loadRazorpay();

      if (!isLoaded) {
        alert("Razorpay SDK failed to load. Check internet.");
        setLoading(false);
        return;
      }
    
      // 2️⃣ Create order from backend
      const { data } = await axios.post(
        "https://hichicken1.onrender.com/api/payment/create",
        {
          amount: Number(order.total)
        }
      );

      const razorpayOrder = data.order;

      console.log("🧾 Order:", razorpayOrder);

      // 3️⃣ Razorpay options
      const options = {
        key: "rzp_live_SjEZLwkY4C3zOo",
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "HI CHICKEN",
        description: "Chicken Order Payment",
        order_id: razorpayOrder.id,

        // ✅ Helps in LIVE mode
        prefill: {
          name: "Customer",
          email: "test@example.com",
          contact: "9999999999"
        },

        // ✅ SUCCESS HANDLER
        handler: async function (response) {
          console.log("✅ Payment Response:", response);

          try {
            const verifyRes = await axios.post(
              "https://hichicken1.onrender.com/api/payment/verify",
              response
            );

            console.log("🔍 Verify Response:", verifyRes.data);

            if (verifyRes.data.success) {
              alert("✅ Payment Successful");
              navigate("/success");
            } else {
              alert("❌ Payment Verification Failed");
            }
          } catch (err) {
            console.error("❌ Verify Error:", err);
            alert("Verification failed");
          } finally {
            setLoading(false);
          }
        },

        theme: {
          color: "#800000",
        },

        // ✅ Handle popup close
        modal: {
          ondismiss: function () {
            console.log("❌ Payment popup closed");
            setLoading(false);
          }
        }
      };

      // 4️⃣ Open Razorpay
      if (!window.Razorpay) {
        alert("Razorpay not available");
        setLoading(false);
        return;
      }

      const razor = new window.Razorpay(options);

      // ✅ Payment failure handler
      razor.on("payment.failed", function (response) {
        console.error("❌ Payment Failed:", response.error);
        alert(response.error.description);
        setLoading(false);
      });

      console.log("🚀 Opening Razorpay...");
      razor.open();

    } catch (error) {
      console.error("❌ PAYMENT ERROR:", error);
      alert("Payment failed");
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h2>Make Payment</h2>

      <div className="order-box">
        <h3>{order?.productName}</h3>
        <p>Quantity: {order?.quantity}</p>
        <p className="total">Total: ₹{order?.total}</p>
      </div>

      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : `Pay ₹${order?.total}`}
      </button>
    </div>
  );
};

export default Payment;