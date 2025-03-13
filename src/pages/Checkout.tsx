
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, CreditCard, Landmark, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const paymentMethods = [
  { id: "credit-card", name: "Credit / Debit Card", icon: <CreditCard className="w-5 h-5" /> },
  { id: "upi", name: "UPI", icon: <Wallet className="w-5 h-5" /> },
  { id: "bank", name: "Bank Transfer", icon: <Landmark className="w-5 h-5" /> },
  { id: "cod", name: "Cash on Delivery", icon: <Check className="w-5 h-5" /> },
];

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0].id);
  
  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const handlePlaceOrder = () => {
    clearCart();
    navigate("/order-success");
  };

  const tax = subtotal * 0.1;
  const shipping = 5;
  const total = subtotal + tax + shipping;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-cake-text mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-cake-text mb-6">
                Shipping Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-cake-text mb-1">
                    First Name
                  </label>
                  <Input 
                    id="firstName" 
                    placeholder="Enter your first name" 
                    className="border-cake-border focus-visible:ring-cake-primary"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-cake-text mb-1">
                    Last Name
                  </label>
                  <Input 
                    id="lastName" 
                    placeholder="Enter your last name" 
                    className="border-cake-border focus-visible:ring-cake-primary"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-cake-text mb-1">
                  Address
                </label>
                <Input 
                  id="address" 
                  placeholder="Enter your address" 
                  className="border-cake-border focus-visible:ring-cake-primary"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-cake-text mb-1">
                    City
                  </label>
                  <Input 
                    id="city" 
                    placeholder="Enter your city" 
                    className="border-cake-border focus-visible:ring-cake-primary"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-cake-text mb-1">
                    State
                  </label>
                  <Input 
                    id="state" 
                    placeholder="Enter your state" 
                    className="border-cake-border focus-visible:ring-cake-primary"
                  />
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-cake-text mb-1">
                    ZIP Code
                  </label>
                  <Input 
                    id="zipCode" 
                    placeholder="Enter your ZIP code" 
                    className="border-cake-border focus-visible:ring-cake-primary"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-cake-text mb-1">
                    Phone Number
                  </label>
                  <Input 
                    id="phone" 
                    placeholder="Enter your phone number" 
                    className="border-cake-border focus-visible:ring-cake-primary"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-cake-text mb-1">
                    Email
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email" 
                    className="border-cake-border focus-visible:ring-cake-primary"
                  />
                </div>
              </div>
            </div>
            
            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-cake-text mb-6">
                Payment Method
              </h2>
              
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div 
                    key={method.id}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors
                      ${paymentMethod === method.id 
                        ? 'border-cake-primary bg-cake-primary/5' 
                        : 'border-gray-200 hover:bg-gray-50'}`}
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3
                      ${paymentMethod === method.id ? 'border-cake-primary' : 'border-gray-300'}`}
                    >
                      {paymentMethod === method.id && (
                        <div className="w-3 h-3 rounded-full bg-cake-primary" />
                      )}
                    </div>
                    <div className="flex items-center">
                      <span className="mr-3 text-cake-text/70">{method.icon}</span>
                      <span className="font-medium text-cake-text">{method.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-cake-text mb-6">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-4">
                {items.map((item) => (
                  <div key={item.cake.id} className="flex justify-between">
                    <div className="flex items-center">
                      <span className="mr-2 font-medium text-cake-text">
                        {item.quantity} ×
                      </span>
                      <span className="text-cake-text/70">{item.cake.name}</span>
                    </div>
                    <span className="font-medium">
                      ${(item.cake.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4 space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-cake-text/70">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cake-text/70">Shipping</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cake-text/70">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="font-bold text-cake-text">Total</span>
                  <span className="font-bold text-cake-primary">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
              
              <Button 
                className="w-full bg-cake-primary hover:bg-cake-dark text-white"
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
              
              <p className="text-sm text-cake-text/60 text-center mt-4">
                By placing your order, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
