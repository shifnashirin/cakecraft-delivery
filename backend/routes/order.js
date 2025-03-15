
import express from "express";
import Order from "../models/Order.js";
import User from "../models/User.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all orders (admin only)
router.get("/", authMiddleware, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
});

// Get order by ID (admin or order owner)
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    // Check if user owns this order or is admin
    if (req.user.role !== "admin" && 
        (!order.customer.userId || order.customer.userId.toString() !== req.user._id.toString())) {
      return res.status(403).json({ message: "Access denied. Not your order." });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error: error.message });
  }
});

// Create new order (any authenticated user)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, notes } = req.body;
    
    if (!items || !items.length || !shippingAddress || !paymentMethod) {
      return res.status(400).json({ message: "Missing required order details" });
    }
    
    // Calculate total amount
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const newOrder = new Order({
      customer: {
        name: req.user.fullName || "Customer",
        email: req.user.email,
        phone: req.user.phone || "",
        userId: req.user._id
      },
      items,
      shippingAddress,
      totalAmount,
      paymentMethod,
      notes
    });
    
    await newOrder.save();
    
    // Add order to user's orders array
    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { orders: newOrder._id } }
    );
    
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: "Error creating order", error: error.message });
  }
});

// Update order status (admin only)
router.patch("/:id/status", authMiddleware, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    order.status = status;
    await order.save();
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error updating order status", error: error.message });
  }
});

// Get user's orders
router.get("/user/my-orders", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ "customer.userId": req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching your orders", error: error.message });
  }
});

// Get order statistics (admin only)
router.get("/stats/admin", authMiddleware, isAdmin, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    
    const pendingOrders = await Order.countDocuments({
      status: "pending"
    });
    
    const completedOrders = await Order.countDocuments({
      status: { $in: ["completed", "delivered"] }
    });
    
    const totalRevenue = await Order.aggregate([
      { $match: { status: { $ne: "canceled" } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);
    
    const revenue = totalRevenue.length > 0 ? totalRevenue[0].total : 0;
    
    res.json({
      totalOrders,
      pendingOrders,
      completedOrders,
      revenue
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching statistics", error: error.message });
  }
});

export default router;
