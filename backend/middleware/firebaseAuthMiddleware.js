
import admin from "../firebase-admin.js";
import User from "../models/User.js";

// Verify Firebase token middleware
export const verifyFirebaseToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    // Verify the Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    if (!decodedToken) {
      return res.status(401).json({ message: "Invalid token" });
    }
    
    // Find or create user in MongoDB based on Firebase UID
    let user = await User.findOne({ firebaseUid: decodedToken.uid });
    
    if (!user) {
      // Create a new user in MongoDB if they don't exist
      user = new User({
        email: decodedToken.email,
        firebaseUid: decodedToken.uid,
        fullName: decodedToken.name || "",
        role: "customer" // Default role
      });
      
      await user.save();
    }
    
    req.user = user;
    req.firebaseUser = decodedToken;
    next();
  } catch (error) {
    console.error("Firebase auth error:", error);
    res.status(401).json({ message: "Invalid token", error: error.message });
  }
};

// Admin check middleware
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin privileges required." });
  }
  next();
};
