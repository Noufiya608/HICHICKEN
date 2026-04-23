import express from "express";
import upload from "../Middleware/productMiddleware.js";
import { addProduct, getProducts } from "../CONTROLLER/productController.js";

const router = express.Router();

// 🔥 routes → controller
router.post("/add", upload.single("image"), addProduct);
router.get("/", getProducts);

export default router;