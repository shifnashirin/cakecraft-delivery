import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/order.js";
dotenv.config(); //  Load environment variables first

const app = express();

//  Use environment variable for MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://cakedelightapp:963322@cluster0.xaz5x.mongodb.net/cakedelightapp";

//  Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.error(" MongoDB Connection Error:", err));

//  Middleware
app.use(cors());
app.use(express.json());

//  Basic API Route
app.get("/", (req, res) => {
  res.send(" CakeDelight Backend is Running");
});

//Routes
app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);

//  Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
