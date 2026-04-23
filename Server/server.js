import express from "express";
const app = express();
import dotenv from "dotenv";

 dotenv.config();
import mongoose from "mongoose";
import cors from "cors";
import priceRoutes from "./ROUTES/priceRoutes.js"
import orderRoutes from "./ROUTES/orderRoutes.js"
import payRoutes from "./ROUTES/payRoutes.js"
import authRoutes from "./ROUTES/authRoutes.js"
import contactRoutes from "./ROUTES/contactRoutes.js"
import productRoutes from "./ROUTES/productRoutes.js"

 

 app.use(cors());
 app.use(express.json());

 app.use("/api/price",priceRoutes);
 app.use("/api/order",orderRoutes);
app.use("/api/payment",payRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/uploads", express.static("uploads"));

app.use("/api/products", productRoutes);


 mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Mongodb connected")
    
 })
 .catch((err)=>{
    console.log("Mongodb not connected",err)
 }
)
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`server is running on  ${PORT}`);
})
