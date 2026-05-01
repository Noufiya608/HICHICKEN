import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,

  // ✅ ADD THIS
  address: {
    type: String,
    default: ""
  },

  location: {
    lat: {
      type: Number,
      default: null
    },
    lng: {
      type: Number,
      default: null
    },
    addressText: {
      type: String,
      default: ""
    }
  },

  isAdmin: {
    type: Boolean,
    default: false
  },

  otp: Number,
  otpExpire: Date

}, { timestamps: true });
export default mongoose.model("User", userSchema);