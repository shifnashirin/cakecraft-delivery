
import express from "express";
import Product from "../models/Product.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all products (public)
router.get("/", async (req, res) => {
  try {
    const { category, featured, specialOccasion, search } = req.query;
    
    let query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (featured === "true") {
      query.featured = true;
    }
    
    if (specialOccasion) {
      query.specialOccasion = specialOccasion;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }
    
    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
});

// Get single product (public)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product", error: err.message });
  }
});

// ADMIN ROUTES

// Create new product (admin only)
router.post("/add", authMiddleware, isAdmin, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: "Error creating product", error: err.message });
  }
});


// Update product (admin only)
router.put("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: "Error updating product", error: err.message });
  }
});

// Delete product (admin only)
router.delete("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err.message });
  }
});

export default router;
