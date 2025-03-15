
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token", error: error.message });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin privileges required." });
  }
  next();
};

const isShopOwner = (req, res, next) => {
  if (req.user.role !== "shopOwner" && req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Shop owner privileges required." });
  }
  next();
};

// New middleware: Check if user is the owner of a specific shop
const isShopOwnerOf = (shopId) => {
  return async (req, res, next) => {
    // Admin can access any shop
    if (req.user.role === "admin") {
      return next();
    }
    
    // Shop owners can only access their own shop
    if (req.user.role === "shopOwner") {
      if (req.user._id.toString() === shopId.toString()) {
        return next();
      }
      return res.status(403).json({ message: "You can only manage your own shop" });
    }
    
    return res.status(403).json({ message: "Access denied. Shop owner privileges required." });
  };
};

export { authMiddleware, isAdmin, isShopOwner, isShopOwnerOf };
