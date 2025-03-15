
import express from "express";
import Order from "../models/Order.js";
import { authMiddleware, isShopOwner, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all orders (shop owner specific or all for admin)
router.get("/", authMiddleware, async (req, res) => {
  try {
    let query = {};
    
    // If not admin, only show orders for this shop owner
    if (req.user.role === "shopOwner") {
      query.shopOwner = req.user._id;
    }
    
    const orders = await Order.find(query).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
});

// Get order by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    // Check if user has permission to view this order
    if (req.user.role === "shopOwner" && order.shopOwner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied. Not your order." });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error: error.message });
  }
});

// Create new order
router.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: "Error creating order", error: error.message });
  }
});

// Update order status
router.patch("/:id/status", authMiddleware, isShopOwner, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    // Check if shop owner owns this order or user is admin
    if (req.user.role === "shopOwner" && order.shopOwner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied. Not your order." });
    }
    
    order.status = status;
    await order.save();
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error updating order status", error: error.message });
  }
});

// Delete order (admin only)
router.delete("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error: error.message });
  }
});

// Get shop order statistics
router.get("/stats/shop", authMiddleware, isShopOwner, async (req, res) => {
  try {
    let query = {};
    
    // If not admin, only include shop orders
    if (req.user.role === "shopOwner") {
      query.shopOwner = req.user._id;
    }
    
    const totalOrders = await Order.countDocuments(query);
    
    const pendingOrders = await Order.countDocuments({
      ...query,
      status: "pending"
    });
    
    const completedOrders = await Order.countDocuments({
      ...query,
      status: { $in: ["completed", "delivered"] }
    });
    
    const totalRevenue = await Order.aggregate([
      { $match: { ...query, status: { $ne: "canceled" } } },
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
