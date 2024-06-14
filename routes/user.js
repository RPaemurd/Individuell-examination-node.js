import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { _id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.json({ success: true, message: "Login successful", token });
    }

    return res
      .status(400)
      .json({ success: false, message: "Invalid credentials" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { id, username, password, isAdmin } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      id,
      username,
      password: hashedPassword,
      isAdmin: isAdmin || false,
    });
    const savedUser = await user.save();
    res.status(200).json({
      success: true,
      message: "Registration successful",
      user: savedUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error });
  }
});

export default router;
