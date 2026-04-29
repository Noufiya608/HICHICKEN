import React from "react";
import { useNavigate } from "react-router-dom";
import "./success.css";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <div className="success-card">
        <h1>🎉 Payment Successful!</h1>
        <p>Your order has been placed successfully.</p>

        <button onClick={() => navigate("/")}>
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Success;