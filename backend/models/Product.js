
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  inventory: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  specialOccasion: { type: String },
  ingredients: [{ type: String }],
  nutritionalInfo: {
    calories: { type: Number },
    fat: { type: Number },
    sugar: { type: Number },
    protein: { type: Number }
  },
  allergens: [{ type: String }],
  reviews: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    date: { type: Date, default: Date.now }
  }],
  averageRating: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Product", ProductSchema);
