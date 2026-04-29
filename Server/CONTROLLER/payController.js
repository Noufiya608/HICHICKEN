import Razorpay from "razorpay";
import crypto from "crypto";
import Pay from "../MODEL/payModel.js";
import dotenv from "dotenv";
dotenv.config();


// 🔍 DEBUG: Check ENV values
console.log("🔑 RAZORPAY KEY ID:", process.env.RAZORPAY_KEY_ID);
console.log("🔑 RAZORPAY KEY SECRET:", process.env.RAZORPAY_KEY_SECRET);

// ✅ Initialize Razorpay


// ✅ Create Order
export const createPayment = async (req, res) => {
  try {
    console.log("🔑 KEY:", process.env.RAZORPAY_KEY_ID);

    const razorpay = new Razorpay({   // ✅ MOVE HERE
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
      
    });
   

    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    const newOrder = await Pay.create({
      razorpay_order_id: order.id,
      amount,
      currency: order.currency
    });

    res.json({
      success: true,
      order,
      dbOrder: newOrder
    });

  } catch (error) {
    console.error("❌ CREATE ORDER ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Verify Payment
export const verifyPayment = async (req, res) => {
  try {
    console.log("📥 Verify Request:", req.body);

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    console.log("🔐 Signature Body:", body);

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    console.log("🔑 Expected Signature:", expectedSignature);
    console.log("📩 Received Signature:", razorpay_signature);

    if (expectedSignature === razorpay_signature) {

      console.log("✅ Payment Verified");

      await Pay.findOneAndUpdate(
        { razorpay_order_id },
        {
          razorpay_payment_id,
          razorpay_signature,
          status: "paid"
        }
      );

      res.json({ success: true, message: "Payment verified" });

    } else {
      console.log("❌ Invalid Signature");
      res.status(400).json({ success: false, message: "Invalid signature" });
    }

  } catch (error) {
    console.error("❌ VERIFY ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};