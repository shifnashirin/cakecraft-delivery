
import express from "express";
import User from "../models/User.js";
import { verifyFirebaseToken, isAdmin } from "../middleware/firebaseAuthMiddleware.js";

const router = express.Router();

// Get user profile (protected)
router.get("/profile", verifyFirebaseToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile", error: err.message });
  }
});

// Update user profile (protected)
router.put("/profile", verifyFirebaseToken, async (req, res) => {
  try {
    const { fullName, phone, address } = req.body;
    
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    if (fullName) user.fullName = fullName;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    
    await user.save();
    
    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Error updating profile", error: err.message });
  }
});

// Register user in MongoDB (after Firebase auth)
router.post("/register", verifyFirebaseToken, async (req, res) => {
  try {
    // User should already exist from the auth middleware
    // We're just updating additional data
    const { fullName, phone } = req.body;
    
    const user = await User.findById(req.user._id);
    
    if (fullName) user.fullName = fullName;
    if (phone) user.phone = phone;
    
    await user.save();
    
    res.status(201).json({ message: "User details updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Error updating user details", error: err.message });
  }
});

// Update user role (admin only)
router.put("/role/:id", verifyFirebaseToken, isAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!role || !['customer', 'admin', 'shop_owner'].includes(role)) {
      return res.status(400).json({ message: "Invalid role specified" });
    }
    
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    user.role = role;
    await user.save();
    
    res.json({ message: `User role updated to ${role}`, user });
  } catch (err) {
    res.status(500).json({ message: "Error updating user role", error: err.message });
  }
});

// Get all users (admin only)
router.get("/", verifyFirebaseToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
});

export default router;
