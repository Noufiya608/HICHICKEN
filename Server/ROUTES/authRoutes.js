import express from "express";
import {
  signup,
  login,
  sendOTP,
  resetPassword,
  deleteUserById,
  deleteAllUsers,
  getAllUsers,
  getUserById,
  makeAdmin,
  getMyProfile,
  updateMyProfile
} from "../CONTROLLER/authController.js";
import { isAdmin } from "../Middleware/adminMiddleware.js";
import { protect } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/send-otp", sendOTP);
router.post("/reset-password", resetPassword);

router.get("/me", protect, getMyProfile);   // ✅ FIRST
router.put("/me", protect, updateMyProfile);
router.delete("/user/:id", deleteUserById);
router.delete("/users", deleteAllUsers);
router.get("/users", getAllUsers);
router.get("/user/:id", getUserById);
router.put("/make-admin/:id", protect, isAdmin, makeAdmin);


export default router;