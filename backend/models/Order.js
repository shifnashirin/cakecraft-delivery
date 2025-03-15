
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  items: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 },
    imageUrl: { type: String },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
  }],
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, default: 'United States' }
  },
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    required: true, 
    default: 'pending',
    enum: ['pending', 'processing', 'completed', 'delivered', 'canceled'] 
  },
  paymentMethod: { type: String, required: true },
  paymentStatus: { 
    type: String, 
    required: true, 
    default: 'pending',
    enum: ['pending', 'completed', 'failed', 'refunded'] 
  },
  notes: { type: String },
  orderDate: { type: Date, default: Date.now },
  deliveryDate: { type: Date },
  trackingNumber: { type: String },
  couponCode: { type: String },
  discountAmount: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Order", OrderSchema);
