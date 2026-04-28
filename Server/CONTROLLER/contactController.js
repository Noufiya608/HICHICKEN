import Contact from "../MODEL/contactModel.js";
import { Resend } from "resend";

import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY1);

export const sendContact = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    await resend.emails.send({
      from: "Hi Chicken <onboarding@resend.dev>",
      to: EMAIL_TO, // ✅ FIXED
      subject: `New Message from ${name}`,
      html: `
        <h3>New Contact Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `
    });

    res.status(200).json({ message: "Message sent successfully" });

  } catch (error) {
    console.error("EMAIL ERROR:", error); // 👈 add this
    res.status(500).json({ message: "Error sending message" });
  }
};