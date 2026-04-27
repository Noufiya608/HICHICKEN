import express from "express";
import upload from "../Middleware/productMiddleware.js";
import { addProduct, getProducts } from "../CONTROLLER/productController.js";

const router = express.Router();

// 🔥 VERY IMPORTANT → "image" must match frontend field name
router.post("/", upload.single("image"), addProduct);

router.get("/", getProducts);

export default router;