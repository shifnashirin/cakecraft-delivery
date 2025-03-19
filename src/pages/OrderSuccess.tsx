import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";

const OrderSuccess = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (!orderId) {
          setError("No order ID provided");
          setLoading(false);
          return;
        }
        
        const orderRef = doc(db, "orders", orderId);
        const orderSnap = await getDoc(orderRef);
        
        if (orderSnap.exists()) {
          setOrder({
            id: orderSnap.id,
            ...orderSnap.data()
          });
        } else {
          setError("Order not found");
        }
      } catch (err) {
        console.error("Error fetching order:", err);
        setError("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrderDetails();
  }, [orderId]);

  // Format date if we have order data
  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center bg-cake-background">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cake-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center bg-cake-background">
          <div className="container max-w-2xl mx-auto px-4 py-16">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h1 className="text-2xl font-bold text-cake-text mb-4">
                {error || "Order information not available"}
              </h1>
              <p className="text-cake-text/70 mb-6">
                We couldn't find the order details you're looking for.
              </p>
              <Button 
                className="bg-cake-primary hover:bg-cake-dark text-white"
                asChild
              >
                <Link to="/">Return to Home</Link>
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center bg-cake-background">
        <div className="container max-w-3xl mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-green-100 rounded-full">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            
            <h1 className="text-3xl font-bold text-cake-text mb-4">
              Order Successful!
            </h1>
            
            <p className="text-cake-text/70 mb-8">
              Thank you for your order. Your order has been received and is now being processed.
            </p>
            
            <div className="bg-cake-background rounded-lg p-6 mb-8">
              <p className="text-cake-text/70 mb-2">Order Number:</p>
              <p className="text-xl font-bold text-cake-text mb-4">
                #{order.id}
              </p>
              
              <p className="text-cake-text/70 mb-2">Order Date:</p>
              <p className="text-lg font-medium text-cake-text mb-6">
                {formatDate(order.createdAt)}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="outline" 
                  className="border-cake-primary text-cake-primary hover:bg-cake-primary/10"
                  asChild
                >
                  <Link to={`/track-order/${order.id}`}>Track Order</Link>
                </Button>
                <Button 
                  className="bg-cake-primary hover:bg-cake-dark text-white"
                  asChild
                >
                  <Link to="/">Continue Shopping</Link>
                </Button>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h2 className="text-xl font-semibold text-cake-text mb-4">
                Order Summary
              </h2>
              <div className="flex justify-between border-b border-gray-100 py-2">
                <span className="text-cake-text/70">Subtotal:</span>
                <span className="font-medium">${order.subtotal?.toFixed(2) || "0.00"}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 py-2">
                <span className="text-cake-text/70">Shipping:</span>
                <span className="font-medium">${order.shipping?.toFixed(2) || "0.00"}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 py-2">
                <span className="text-cake-text/70">Tax:</span>
                <span className="font-medium">${order.tax?.toFixed(2) || "0.00"}</span>
              </div>
              <div className="flex justify-between py-2 font-bold">
                <span className="text-cake-text">Total:</span>
                <span className="text-cake-primary">${order.total?.toFixed(2) || "0.00"}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold text-cake-text mb-4">
                What's Next?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 flex items-center justify-center bg-cake-primary/20 rounded-full mb-4 text-cake-primary">
                    1
                  </div>
                  <h3 className="font-medium text-cake-text mb-2">
                    Order Confirmation
                  </h3>
                  <p className="text-sm text-cake-text/70">
                    You will receive an email confirmation shortly.
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 flex items-center justify-center bg-cake-primary/20 rounded-full mb-4 text-cake-primary">
                    2
                  </div>
                  <h3 className="font-medium text-cake-text mb-2">
                    Order Preparation
                  </h3>
                  <p className="text-sm text-cake-text/70">
                    Our bakers will start preparing your delicious cake.
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 flex items-center justify-center bg-cake-primary/20 rounded-full mb-4 text-cake-primary">
                    3
                  </div>
                  <h3 className="font-medium text-cake-text mb-2">
                    Delivery
                  </h3>
                  <p className="text-sm text-cake-text/70">
                    Your cake will be delivered to you at the scheduled time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderSuccess;