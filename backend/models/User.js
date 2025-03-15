
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    required: true, 
    default: 'customer',
    enum: ['customer', 'admin', 'shopOwner'] 
  },
  shop: {
    name: { type: String },
    description: { type: String },
    logo: { type: String },
    address: { type: String },
    phone: { type: String }
  }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
