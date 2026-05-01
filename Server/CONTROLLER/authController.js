import User from "../MODEL/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../Utils/sendEmail.js";

// 🔹 Signup
export const signup = async (req, res) => {
  try {
    const { name, email, password, location } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hash,
      location
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: newUser
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// 🔹 Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });

    // ✅ Include isAdmin in token also (optional but good)
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ SEND isAdmin to frontend
    res.json({
      message: "Login success",
      token,
      isAdmin: user.isAdmin   // 🔥 THIS LINE FIXES YOUR ISSUE
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Send OTP via Email
export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000);

    user.otp = otp;
    user.otpExpire = Date.now() + 5 * 60 * 1000;

    await user.save();

    await sendEmail(email, otp);

    res.json({ message: "OTP sent to email" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.otp != otp || user.otpExpire < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = null;
    user.otpExpire = null;

    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// 🔹 Delete single user by ID
export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// 🔹 Delete all users
export const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany();

    res.json({ message: "All users deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// 🔹 Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // hide password

    res.json(users);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// 🔹 Get single user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// 🔹 Make user admin
export const makeAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(
      id,
      { isAdmin: true },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User promoted to admin", user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//Create User (Signup)
  


//Update User
export const updateMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name: req.body.name,
        address: req.body.address
      },
      {
        new: true,              // ✅ returns updated data
        runValidators: true
      }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser); // ✅ IMPORTANT

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//Delete User
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "User deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

