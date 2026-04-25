import React, { useState } from "react";
import axios from "axios";
import "./pay.css";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state;

  // 🔐 Payment Handler
  const handlePayment = async () => {
    try {
      if (!order?.total) {
        alert("Invalid order amount");
        return;
      }

      console.log("💰 Sending Amount:", order.total);

      setLoading(true);

      // 1️⃣ Create order from backend
      const { data } = await axios.post(
        "https://hichicken1.onrender.com/api/payment/create",
        {
          amount: Number(order.total) // ✅ FIXED
        }
      );

      const razorpayOrder = data.order;

      // 2️⃣ Razorpay options
      const options = {
        key: "rzp_test_SeRoRZx6PRcPl4", // ⚠️ Replace with ENV later
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "HI CHICKEN",
        description: "Chicken Order Payment",
        order_id: razorpayOrder.id,

        handler: async function (response) {
          try {
            // 3️⃣ Verify payment
            const verifyRes = await axios.post(
              "https://hichicken1.onrender.com/api/payment/verify",
              response
            );

            if (verifyRes.data.success) {
              alert("✅ Payment Successful");

              // 👉 Optional redirect
              navigate("/success");
            } else {
              alert("❌ Payment Failed");
            }
          } catch (err) {
            console.error(err);
            alert("Verification failed");
          }
        },

        theme: {
          color: "#800000",
        },
      };

      // 4️⃣ Open Razorpay
      const razor = new window.Razorpay(options);
      razor.open();

      setLoading(false);
    } catch (error) {
      console.error("❌ PAYMENT ERROR:", error);
      alert("Payment failed");
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h2>Make Payment</h2>

      {/* 🧾 Order Details */}
      <div className="order-box">
        <h3>{order?.productName}</h3>
        <p>Quantity: {order?.quantity}</p>
        <p className="total">Total: ₹{order?.total}</p>
      </div>

      {/* 💳 Pay Button */}
      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : `Pay ₹${order?.total}`}
      </button>
    </div>
  );
};

export default Payment;