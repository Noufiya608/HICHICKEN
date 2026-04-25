import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import cors from "cors";

import priceRoutes from "./ROUTES/priceRoutes.js";
import orderRoutes from "./ROUTES/orderRoutes.js";
import payRoutes from "./ROUTES/payRoutes.js";
import authRoutes from "./ROUTES/authRoutes.js";
import contactRoutes from "./ROUTES/contactRoutes.js";
import productRoutes from "./ROUTES/productRoutes.js";

app.use(cors({
  origin: [
    "https://www.hichicken.in",
    "https://hichicken.in",
    "https://hichicken2.onrender.com",
    "http://localhost:5173"
  ],
  credentials: true
}));

app.options("*", cors());

app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});
app.use("/api/price", priceRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/payment", payRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/products", productRoutes);
app.use("/uploads", express.static("uploads"));

// 🔥 CRITICAL FIX (DB FIRST, THEN SERVER)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on ${process.env.PORT || 5000}`);
    });

  })
  .catch((err) => {
    console.log("❌ MongoDB not connected", err);
  });