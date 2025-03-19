import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, X, ShoppingBag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { auth, db } from '@/config/firebase';
import { addDoc, collection, updateDoc, doc, getDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      setIsProcessing(true);
      setError(null);
      
      // Check if user is logged in
      const currentUser = auth.currentUser;
      if (!currentUser) {
        // Redirect to login page if not logged in
        navigate('/login', { state: { redirect: '/cart' } });
        return;
      }
      
      // Calculate order details
      const shipping = 5.00;
      const tax = subtotal * 0.1;
      const total = subtotal + shipping + tax;
      
      // Create order object
      const orderItems = items.map(item => ({
        cakeId: item.cake.id,
        name: item.cake.name,
        price: item.cake.price,
        quantity: item.quantity,
        imageURL: item.cake.imageURL,
        subtotal: item.cake.price * item.quantity
      }));
      
      const order = {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        items: orderItems,
        subtotal: subtotal,
        shipping: shipping,
        tax: tax,
        total: total,
        status: 'pending',
        createdAt: serverTimestamp()
      };
      
      // 1. Add order to orders collection
      const orderRef = await addDoc(collection(db, 'orders'), order);
      const orderId = orderRef.id;
      
      // 2. Update user document with order reference
      const userDocRef = doc(db, 'users', currentUser.uid);
      
      // Check if user document exists, if not create it
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        // Update existing user document
        await updateDoc(userDocRef, {
          orders: arrayUnion({
            orderId: orderId,
            date: new Date().toISOString(),
            total: total,
            status: 'pending'
          })
        });
      } else {
        // Create new user document
        await updateDoc(userDocRef, {
          email: currentUser.email,
          orders: [{
            orderId: orderId,
            date: new Date().toISOString(),
            total: total,
            status: 'pending'
          }]
        });
      }
      
      // Clear the cart
      clearCart();
      
      // Redirect to order confirmation page
      navigate(`/checkout/success/${orderId}`);
      
    } catch (err) {
      console.error("Error creating order:", err);
      setError("Failed to process your order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-cake-text mb-8">Your Cart</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 mx-auto text-cake-text/30 mb-4" />
            <h2 className="text-2xl font-bold text-cake-text mb-4">Your cart is empty</h2>
            <p className="text-cake-text/70 mb-8">
              It looks like you haven't added any cakes to your cart yet.
            </p>
            <Button 
              className="bg-cake-primary hover:bg-cake-dark text-white"
              asChild
            >
              <Link to="/">Browse Cakes</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="hidden sm:grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50">
                  <div className="col-span-6">
                    <span className="font-medium text-cake-text">Product</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="font-medium text-cake-text">Price</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="font-medium text-cake-text">Quantity</span>
                  </div>
                  <div className="col-span-2 text-right">
                    <span className="font-medium text-cake-text">Total</span>
                  </div>
                </div>
                
                {items.map((item) => (
                  <div 
                    key={item.cake.id} 
                    className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 border-b border-gray-200 items-center"
                  >
                    <div className="col-span-1 sm:col-span-6">
                      <div className="flex items-center">
                        <div className="w-20 h-20 flex-shrink-0 mr-4">
                          <img 
                            src={item.cake.imageURL} 
                            alt={item.cake.name} 
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-cake-text">
                            <Link to={`/cake/${item.cake.id}`} className="hover:text-cake-primary">
                              {item.cake.name}
                            </Link>
                          </h3>
                          <button 
                            onClick={() => removeFromCart(item.cake.id)}
                            className="text-sm text-red-500 hover:text-red-700 flex items-center mt-1"
                          >
                            <X className="w-3 h-3 mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-span-1 sm:col-span-2 flex sm:justify-center">
                      <div className="sm:hidden mr-2 font-medium">Price:</div>
                      <div>${item.cake.price.toFixed(2)}</div>
                    </div>
                    
                    <div className="col-span-1 sm:col-span-2 flex sm:justify-center">
                      <div className="sm:hidden mr-2 font-medium">Quantity:</div>
                      <div className="flex items-center border border-gray-200 rounded-md">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-cake-text hover:text-cake-primary"
                          onClick={() => updateQuantity(item.cake.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-cake-text hover:text-cake-primary"
                          onClick={() => updateQuantity(item.cake.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="col-span-1 sm:col-span-2 flex sm:justify-end">
                      <div className="sm:hidden mr-2 font-medium">Total:</div>
                      <div className="font-medium">
                        ${(item.cake.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="p-4 flex justify-between">
                  <Button 
                    variant="outline" 
                    className="border-cake-primary text-cake-primary hover:bg-cake-primary/10"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                  <Button 
                    className="bg-cake-primary hover:bg-cake-dark text-white"
                    asChild
                  >
                    <Link to="/">Continue Shopping</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-cake-text mb-6">
                  Order Summary
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-cake-text/70">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cake-text/70">Shipping</span>
                    <span className="font-medium">$5.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cake-text/70">Tax</span>
                    <span className="font-medium">${(subtotal * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <span className="font-bold text-cake-text">Total</span>
                    <span className="font-bold text-cake-primary">
                      ${(subtotal + 5 + subtotal * 0.1).toFixed(2)}
                    </span>
                  </div>
                </div>
                
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                  </div>
                )}
                
                <Button 
                  className="w-full bg-cake-primary hover:bg-cake-dark text-white"
                  onClick={handleCheckout}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Proceed to Checkout"
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;