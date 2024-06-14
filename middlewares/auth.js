import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(400).json({ message: "Invalid token." });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired." });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(400).json({ message: "Invalid token." });
    } else {
      return res.status(400).json({ message: "Token verification failed." });
    }
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};

export { authMiddleware, adminMiddleware };
